# django_loaddata
Parse CSV to Django loaddata JSON format

Live app available at: https://django-loaddata.herokuapp.com/

Takes an artibitrary CSV file and a model name and converts it to the 
json format Django expects for running `loaddata`.

## Dependencies

* Python 3.7
* [Pipenv](https://pipenv.readthedocs.io/en/latest/)

## Getting Started

1. Clone this repo

```
$ git clone https://github.com/dchess/django_loaddata.git
```

2. Install Pipenv

```
$ pip install pipenv
$ pipenv install
```

## Running the Flask server

```
$ pipenv run flask run
```