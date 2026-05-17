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
        'title': 'Личный герой',
        'occasion': 'для любимого человека',
        'emoji': '❤️',
    },
    {
        'id': 'zryachee-serdce',
        'title': 'Зрячее сердце',
        'occasion': 'для бабушки',
        'emoji': '🌸',
    },
    {
        'id': 'kajfuyu-s-yanoj',
        'title': 'Кайфую с Яной',
        'occasion': 'для подруги на день рождения',
        'emoji': '🎉',
    },
]


def get_tracks() -> list:
    """Читает mp3-файлы из S3 и сопоставляет с метаданными треков"""
    project_id = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    resp = s3.list_objects_v2(Bucket='files', MaxKeys=1000)
    all_objects = resp.get('Contents', [])
    print(f'[S3] Всего объектов в бакете: {len(all_objects)}')
    for o in all_objects:
        print(f'  key={o["Key"]}, size={o["Size"]}')

    # Фильтруем только mp3 файлы, сортируем по дате загрузки
    mp3_files = sorted(
        [o for o in all_objects if o['Key'].lower().endswith('.mp3')],
        key=lambda o: o['LastModified']
    )
    print(f'[S3] MP3 файлов: {len(mp3_files)}')

    tracks = []
    for i, meta in enumerate(TRACKS_META):
        if i < len(mp3_files):
            key = mp3_files[i]['Key']
            url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"
        else:
            url = None
        print(f'[TRACK] {meta["title"]} → {url}')
        tracks.append({
            'id': meta['id'],
            'title': meta['title'],
            'occasion': meta['occasion'],
            'emoji': meta['emoji'],
            'audioUrl': url,
        })

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
