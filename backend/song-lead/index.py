import json
import os
import urllib.request
import urllib.parse
import boto3

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}

TRACKS_META = [
    {
        'id': 'lichnyj-geroj',
        'file': 'lichnyj-geroj.mp3',
        'title': 'Личный герой',
        'occasion': 'для любимого человека',
        'emoji': '❤️',
    },
    {
        'id': 'zryachee-serdce',
        'file': 'serdce.mp3',
        'title': 'Зрячее сердце',
        'occasion': 'для бабушки',
        'emoji': '🌸',
    },
    {
        'id': 'kajfuyu-s-yanoj',
        'file': 'jana.mp3',
        'title': 'Кайфую с Яной',
        'occasion': 'для подруги на день рождения',
        'emoji': '🎉',
    },
]


def get_tracks() -> list:
    """Формирует треки с прямыми CDN-ссылками из S3"""
    project_id = os.environ['AWS_ACCESS_KEY_ID']
    tracks = []
    for meta in TRACKS_META:
        url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{meta['file']}"
        tracks.append({
            'id': meta['id'],
            'title': meta['title'],
            'occasion': meta['occasion'],
            'emoji': meta['emoji'],
            'audioUrl': url,
        })
        print(f"[TRACK] {meta['title']} → {url}")
    return tracks


def handler(event: dict, context) -> dict:
    """GET — треки из S3 для плеера. POST — принимает заявку."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if event.get('httpMethod') == 'GET':
        tracks = get_tracks()
        return {
            'statusCode': 200,
            'headers': CORS,
            'body': json.dumps({'tracks': tracks}, ensure_ascii=False),
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
