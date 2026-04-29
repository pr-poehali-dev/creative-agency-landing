import json
import os
import random
import string
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

OWNER_PHONE = '79818636699'
OWNER_EMAIL = 'aimuselab@yandex.ru'


def generate_order_id() -> str:
    """Генерирует уникальный номер заявки вида АМ-ХХХХ"""
    digits = ''.join(random.choices(string.digits, k=4))
    return f'АМ-{digits}'


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
    print(f'[SMS.RU] response: {json.dumps(result)}')
    return result.get('status') == 'OK'


def send_email_to_owner(order_id: str, from_name: str, from_contact: str, message_text: str) -> bool:
    """Отправляет письмо владельцу через Яндекс SMTP"""
    smtp_password = os.environ.get('YANDEX_SMTP_PASSWORD', '')
    if not smtp_password:
        return False

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[{order_id}] Новая заявка с сайта от {from_name}'
    msg['From'] = OWNER_EMAIL
    msg['To'] = OWNER_EMAIL

    body = f"""Новая заявка с сайта AI MUSE LAB
Номер заявки: {order_id}

От кого: {from_name}
Контакт: {from_contact}

{message_text}
"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(OWNER_EMAIL, smtp_password)
        server.sendmail(OWNER_EMAIL, OWNER_EMAIL, msg.as_string())
    return True


def send_confirmation_to_client(order_id: str, client_name: str, client_email: str, message_text: str) -> bool:
    """Отправляет письмо-подтверждение клиенту"""
    smtp_password = os.environ.get('YANDEX_SMTP_PASSWORD', '')
    if not smtp_password or not client_email:
        return False

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка {order_id} принята — AI Muse Lab'
    msg['From'] = OWNER_EMAIL
    msg['To'] = client_email

    html_body = f"""<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0E0B1A;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">

    <div style="text-align:center;margin-bottom:32px;">
      <p style="color:#C084FC;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 8px;">AI Muse Lab</p>
      <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0;">Ваша заявка принята! 🎉</h1>
    </div>

    <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:16px;padding:20px;margin-bottom:20px;text-align:center;">
      <p style="color:#C084FC;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 6px;">Номер вашей заявки</p>
      <p style="color:#ffffff;font-size:32px;font-weight:800;margin:0;letter-spacing:0.05em;">{order_id}</p>
    </div>

    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(168,85,247,0.2);border-radius:16px;padding:20px;margin-bottom:20px;">
      <p style="color:#C084FC;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 12px;">Здравствуйте, {client_name}!</p>
      <p style="color:#E9D5FF;font-size:14px;line-height:1.6;margin:0 0 12px;">
        Мы получили вашу заявку и уже начинаем работу. Юлия свяжется с вами в течение <strong style="color:#ffffff;">15 минут</strong>.
      </p>
      <p style="color:#E9D5FF;font-size:14px;line-height:1.6;margin:0;">
        Сохраните этот номер заявки — он поможет нам быстро найти ваш заказ при обращении.
      </p>
    </div>

    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(168,85,247,0.15);border-radius:16px;padding:20px;margin-bottom:20px;">
      <p style="color:#C084FC;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 12px;">Детали заказа</p>
      <pre style="color:#D8B4FE;font-size:13px;line-height:1.7;margin:0;white-space:pre-wrap;font-family:Arial,sans-serif;">{message_text}</pre>
    </div>

    <div style="background:rgba(236,72,153,0.1);border:1px solid rgba(236,72,153,0.25);border-radius:16px;padding:16px;margin-bottom:28px;display:flex;align-items:flex-start;gap:12px;">
      <span style="font-size:24px;">🎁</span>
      <div>
        <p style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 4px;">Ваш подарок</p>
        <p style="color:#F9A8D4;font-size:13px;margin:0;">Видео-слайдшоу из ваших фото — бесплатно к каждому треку</p>
      </div>
    </div>

    <div style="text-align:center;padding-top:20px;border-top:1px solid rgba(168,85,247,0.15);">
      <p style="color:#9CA3AF;font-size:12px;margin:0 0 4px;">AI Muse Lab · Авторские песни на заказ</p>
      <p style="color:#9CA3AF;font-size:12px;margin:0;">Telegram: <a href="https://t.me/izmailova8888" style="color:#C084FC;">@izmailova8888</a></p>
    </div>

  </div>
</body>
</html>"""

    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(OWNER_EMAIL, smtp_password)
        server.sendmail(OWNER_EMAIL, client_email, msg.as_string())
    return True


def handler(event: dict, context) -> dict:
    """Принимает заявку с калькулятора, отправляет письмо владельцу и подтверждение клиенту."""

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
    client_email = body.get('client_email', '').strip()
    message = body.get('message', '').strip()
    channel = body.get('channel', 'email')

    if not name or not contact or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    order_id = generate_order_id()
    results = {}

    if channel == 'sms':
        sms_text = f'AI MUSELAB [{order_id}]: {name} ({contact}): {message[:80]}'
        results['sms'] = send_sms(sms_text)

    if channel == 'email':
        results['owner_email'] = send_email_to_owner(order_id, name, contact, message)
        if client_email:
            results['client_email'] = send_confirmation_to_client(order_id, name, client_email, message)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'order_id': order_id, 'results': results})
    }
