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


def list_audio_files() -> list:
    """Возвращает mp3/wav файлы из S3-хранилища"""
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    response = s3.list_objects_v2(Bucket='files', MaxKeys=1000)
    all_keys = [obj['Key'] for obj in response.get('Contents', [])]
    print(f'[S3] Бакет "files", всего объектов ({len(all_keys)}): {all_keys}')
    print(f'[S3] IsTruncated={response.get("IsTruncated")}, KeyCount={response.get("KeyCount")}')
    files = []
    for obj in response.get('Contents', []):
        key = obj['Key']
        if any(key.lower().endswith(ext) for ext in ['.mp3', '.wav', '.ogg', '.m4a', '.flac']):
            files.append({
                'key': key,
                'size': obj['Size'],
                'url': f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}",
            })
    return files


def handler(event: dict, context) -> dict:
    """GET — список аудио-файлов из S3 или отправка треков. POST — принимает заявку."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if event.get('httpMethod') == 'GET':
        params = event.get('queryStringParameters') or {}

        if params.get('action') == 'list-storage':
            files = list_audio_files()
            print(f'[STORAGE] Найдено аудио файлов: {len(files)}')
            for f in files:
                print(f'  - {f["key"]} ({f["size"]} bytes) → {f["url"]}')
            return {
                'statusCode': 200,
                'headers': CORS,
                'body': json.dumps({'files': files}, ensure_ascii=False),
            }

        files = list_audio_files()
        tracks = []
        for f in files:
            name = f['key'].rsplit('/', 1)[-1]
            title = name.rsplit('.', 1)[0]
            tracks.append({
                'id': title.lower().replace(' ', '-'),
                'title': title,
                'occasion': '',
                'emoji': '🎵',
                'audioUrl': f['url'],
            })

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