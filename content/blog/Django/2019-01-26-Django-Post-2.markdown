---
title: 'Django Hello World 실습 및 MTV 패턴'
date: 2019-01-26 00:00:01
category: 'Django'
draft: false
---

이 POST의 모든 마크다운과 실습 코드는<br/>
[여기](https://github.com/LikeLionSCH/LikeLion_Study_Summary)에서 확인할 수 있습니다.

## Hello World 실습

### 1. 가상 환경을 켜고 시작

```
source myvenv/bin/activate
```

### 2. 프로젝트 생성

```
django-admin startproject <project 이름>
```

**Result**<br/>
`<project 이름>`의 폴더 생성

### 3. 프로젝트 경로 이동

```
cd <project 이름>
```

### 4. Django 서버 구동

```
python manage.py runserver
```

**Result**<br/>
http://127.0.0.1:8000/ 와 같은 local주소 확인 가능

서버 종료 : `ctrl` + `c`<br/>
db.sqlite3 : 데이터 베이스를 담당하는 파일<br/>

### 5. App 생성

```
python manage.py startapp <app 이름>
```

**Result**<br/>
`<app 이름>`의 폴더 생성

### 6. templates 폴더 생성<br/>

사용자에게 보여질 `html`파일을 담을 폴더 생성

### 7. settings.py에 App 추가

`<project 이름>` 폴더의 `settings.py`의<br/>
`INSTALLED_APPS` 리스트에 `'myapp.apps.MyappConfig'`와<br/>
같이 `<App 이름>`의 경로 추가<br/>
필자의 `App` 이름은 `myapp`

### 8. html파일을 처리할 함수 정의<br/>

`<App 이름>`의 폴더의 `views.py`파일에

```python
def home(request):
    return render(request, 'home.html')
```

다음과 같이 `home.html` 처리 함수 정의

### 9. home.html의 url설계

`<project 이름>`폴더의 `urls.py` 조작

1. myapp의 `views.py`를 `urls.py`에 import

```python
import myapp.views
```

2. `urlpatterns`리스트에 `path`추가

```python
path('', myapp.views.home, name="home")
```

`path(url조건, 호출할 함수, html 이름)`<br/>
`url`의 이름은 **함수**와 **동일하게** 만들자!

최종 `urls.py`

```python
from django.contrib import admin
from django.urls import path
import myapp.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', myapp.views.home, name="home"),
]
```

### 10. 파일 설정 후 서버 구동 테스트<br/>

<img src="/assets/2019-01-26/1.png" width="600" height="auto">

## MTV 패턴

### MTV란?

`Model`, `Template`, `View`의 약자<br/>

**Model**

- `Data Base`를 다뤄주는 역할
- 데이터 탐색 담당

**Template**

- 사용자에게 보여지는 `html`화면
- 보여주기 담당

**View**

- `함수`들이 모여있는 곳
- 처리 담당

`M`, `T`, `V` 각각 **독립적** 임무 수행으로 `Django`가 작동

### MVC패턴

`MTV`가 차용한 방식으로 더 **일반적인** 패턴<br/>
`Model`, `View`, `Controller`의 약자

**Model**

- `Data Base` 담당
- `MTV`의 `Model`과 같다.

**View**

- 사용자에게 보여지는 화면 담당
- `MTV`의 `Template`와 같다.

**Controller**

- 중간관리 담당
- `MTV`의 `View`와 같다.
