# Generated by Django 3.0.3 on 2020-02-20 00:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ambiente', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='devicedata',
            old_name='device_id',
            new_name='device',
        ),
    ]
