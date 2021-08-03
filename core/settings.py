from pathlib import Path
import os

import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent
# reading .env file
environ.Env.read_env(os.path.join(BASE_DIR.parent, '.env'))


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# Celery
# CELERY_BROKER_URL = os.environ.get('CELERY_URL')
CELERY_BROKER_URL = env('CELERY_URL')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

DEFAULT_DOMAIN = 'localhost:8000'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'core.apps.CoreConfig',
    'accounts.apps.AccountsConfig',
    'frontend.apps.FrontendConfig',
    'inference.apps.InferenceConfig',
    'twitter.apps.TwitterConfig',
    'azure.apps.AzureConfig',
    'knox'
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',)
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTH_USER_MODEL = 'accounts.Account'

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# DATABASES = {
#     # read os.environ['DATABASE_URL'] and raises ImproperlyConfigured exception if not found
#     'default': env.db(),
#     # read os.environ['SQLITE_URL']
#     # 'extra': env.db('SQLITE_URL', default='sqlite:////tmp/my-tmp-sqlite.db')
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASS'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.environ.get('DB_NAME'),
#         'USER': os.environ.get('DB_USER'),
#         'PASSWORD': os.environ.get('DB_PASS'),
#         'HOST': os.environ.get('DB_HOST'),
#         'PORT': os.environ.get('DB_PORT'),
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CORS_ORIGIN_ALLOW_ALL = True


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_USER_PASS')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')

TWITTER_CREDENTIALS = {
    'CONSUMER_KEY': env('TWITTER_CONSUMER_KEY'),
    'CONSUMER_SECRET': env('TWITTER_CONSUMER_SECRET'),
    'ACCESS_TOKEN': env('TWITTER_ACCESS_TOKEN'),
    'ACCESS_SECRET': env('TWITTER_ACCESS_SECRET')
}

AZURE = {
    'SUBSCRIPTION_KEY': env('AZURE_SUBSCRIPTION_KEY'),
    'ENDPOINT': env('AZURE_ENDPOINT')
}

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_USE_TLS = True
# EMAIL_HOST = os.environ.get('EMAIL_HOST')
# EMAIL_PORT = os.environ.get('EMAIL_PORT')
# EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
# EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_USER_PASS')
# DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')
#
# TWITTER_CREDENTIALS = {
#     'CONSUMER_KEY': os.environ.get('TWITTER_CONSUMER_KEY'),
#     'CONSUMER_SECRET': os.environ.get('TWITTER_CONSUMER_SECRET'),
#     'ACCESS_TOKEN': os.environ.get('TWITTER_ACCESS_TOKEN'),
#     'ACCESS_SECRET': os.environ.get('TWITTER_ACCESS_SECRET')
# }
#
# AZURE = {
#     'SUBSCRIPTION_KEY': os.environ.get('AZURE_SUBSCRIPTION_KEY'),
#     'ENDPOINT': os.environ.get('AZURE_ENDPOINT')
# }