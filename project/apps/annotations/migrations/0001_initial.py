# Generated by Django 3.1.3 on 2020-11-05 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Annotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='criate_at')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='update_at')),
                ('title', models.CharField(max_length=100)),
                ('descrition', models.TextField()),
                ('priority', models.PositiveSmallIntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
