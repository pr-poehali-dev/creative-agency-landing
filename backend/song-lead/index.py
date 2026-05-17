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
        'audioUrl': 'https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/ad642f12-36cb-498b-b796-17767144838f.mp3',
    },
    {
        'id': 'zryachee-serdce',
        'title': 'Зрячее сердце',
        'occasion': 'для бабушки',
        'emoji': '🌸',
        'audioUrl': 'https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/8a3562dd-d3af-47dd-9f18-1b13d0c326cb.mp3',
    },
    {
        'id': 'kajfuyu-s-yanoj',
        'title': 'Кайфую с Яной',
        'occasion': 'для подруги на день рождения',
        'emoji': '🎉',
        'audioUrl': 'https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/e43d6175-fb83-4844-bff3-684b8a5c8008.mp3',
    },
]


def handler(event: dict, context) -> dict:
    """GET — треки из S3 для встроенного плеера. POST — принимает заявку."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if event.get('httpMethod') == 'GET':
        return {
            'statusCode': 200,
            'headers': CORS,
            'body': json.dumps({'tracks': TRACKS}, ensure_ascii=False),
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
