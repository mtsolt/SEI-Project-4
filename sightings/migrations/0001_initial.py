# Generated by Django 3.2.5 on 2021-07-26 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('amphibians', '0001_initial'),
        ('surveys', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sighting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(default=None, max_length=200)),
                ('number_of', models.PositiveIntegerField(default=None)),
                ('amphibian', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Sightings', to='amphibians.amphibian')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Amphibian_Found', to='surveys.survey')),
            ],
        ),
    ]
