# Generated by Django 4.1.7 on 2023-02-19 20:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0003_chat_created_at_chat_updated_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='updated_at',
        ),
        migrations.RemoveField(
        model_name='chat',
        name='author',
        )
    ]
