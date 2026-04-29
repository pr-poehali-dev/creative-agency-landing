import json
import os
import urllib.request

import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


OWNER_PHONE = '79818636699'
OWNER_EMAIL = 'aimuselab@yandex.ru'


def send_sms(text: str) -> bool:
    """Отправляет SMS через sms.ru"""
    api_id = os.environ.get('SMSRU_API_ID', '')
    if not api_id:
        return False
    params = urllib.parse.urlencode({
        'api_id': api_id,
        'to': OWNER_PHONE,
        'msg': text,
        'json': 1,
    })
    url = f'https://sms.ru/sms/send?{params}'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())
    return result.get('status') == 'OK'


def send_email(from_name: str, from_contact: str, message_text: str) -> bool:
    """Отправляет email через Яндекс SMTP"""
    smtp_password = os.environ.get('YANDEX_SMTP_PASSWORD', '')
    if not smtp_password:
        return False

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Срочное сообщение с сайта от {from_name}'
    msg['From'] = OWNER_EMAIL
    msg['To'] = OWNER_EMAIL

    body = f"""Новое срочное сообщение с сайта AI MUSELAB

От кого: {from_name}
Контакт: {from_contact}

Сообщение:
{message_text}
"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(OWNER_EMAIL, smtp_password)
        server.sendmail(OWNER_EMAIL, OWNER_EMAIL, msg.as_string())
    return True


def handler(event: dict, context) -> dict:
    """Принимает срочное сообщение с формы контактов и отправляет SMS и/или Email владельцу."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    message = body.get('message', '').strip()
    channel = body.get('channel', 'email')

    if not name or not contact or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    results = {}

    if channel == 'sms':
        sms_text = f'AI MUSELAB: {name} ({contact}): {message[:100]}'
        results['sms'] = send_sms(sms_text)

    if channel == 'email':
        results['email'] = send_email(name, contact, message)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'results': results})
    }