import json
import os
import urllib.request
import urllib.parse

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}

TRACKS = [
    {
        'id': 'lichnyj-geroj',
        'title': 'Личный герой',
        'occasion': 'для любимого человека',
        'emoji': '❤️',
        'public_key': 'https://disk.yandex.ru/d/Qt-vD587OVtjOQ',
    },
    {
        'id': 'zryachee-serdce',
        'title': 'Зрячее сердце',
        'occasion': 'для бабушки',
        'emoji': '🌸',
        'public_key': 'https://disk.yandex.ru/d/ma-Q1rEWWSh4WQ',
    },
    {
        'id': 'kajfuyu-s-yanoj',
        'title': 'Кайфую с Яной',
        'occasion': 'для подруги на день рождения',
        'emoji': '🎉',
        'public_key': 'https://disk.yandex.ru/d/Qt-vD587OVtjOQ',
    },
]


def get_yadisk_url(public_key: str) -> str:
    api = 'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=' + urllib.parse.quote(public_key, safe='')
    req = urllib.request.Request(api, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())['href']


def handler(event: dict, context) -> dict:
    """GET — возвращает прямые ссылки на треки с Яндекс.Диска. POST — принимает заявку."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if event.get('httpMethod') == 'GET':
        result = []
        for track in TRACKS:
            try:
                audio_url = get_yadisk_url(track['public_key'])
            except Exception:
                audio_url = None
            result.append({**{k: v for k, v in track.items() if k != 'public_key'}, 'audioUrl': audio_url})
        return {
            'statusCode': 200,
            'headers': CORS,
            'body': json.dumps({'tracks': result}, ensure_ascii=False),
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    answers = body.get('answers', {})

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и контакт обязательны'})
        }

    lines = [
        '🎵 *Новая заявка — Песня в подарок!*',
        '',
        f'👤 Имя: {name}',
        f'📞 Контакт: {contact}',
    ]

    if answers:
        lines.append('')
        lines.append('🎯 *Калькулятор смыслов:*')
        if answers.get('who'):
            lines.append(f'  Кому: {answers["who"]}')
        if answers.get('occasion'):
            lines.append(f'  Повод: {answers["occasion"]}')
        if answers.get('genre'):
            lines.append(f'  Жанр: {answers["genre"]}')

    message = '\n'.join(lines)

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if token and chat_id:
        try:
            url = f'https://api.telegram.org/bot{token}/sendMessage'
            data = urllib.parse.urlencode({
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'Markdown'
            }).encode()
            req = urllib.request.Request(url, data=data, method='POST')
            urllib.request.urlopen(req, timeout=10)
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }