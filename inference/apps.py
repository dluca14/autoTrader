from django.apps import AppConfig
import pandas as pd
from joblib import load
import os

class InferenceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'inference'
