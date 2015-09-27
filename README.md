# README #

vknplayer - это двухпанельный консольный аудио-плеер для воспроизведения музыки с vk.com написанный полностью на Node.js с использованием фреймворка [blessed]. В будущем планируется поддержка других ресурсов.

> для компиляции модулей lame и speaker требуется наличие в системе make gcc libasound2-dev libmp3lame-dev libmpg123-dev и самого nodejs
> установить их можно коммандой
```sh
# apt-get install nodejs make gcc libasound2-dev libmp3lame-dev libmpg123-dev
```

Интерфейс плеера состоит из двух панелей, панели функциональных клавиш и строки ввода команд. Правая панель - статическая, представляет
из себя плейллист, который наполняется с помощью команд **search** и **radio**.
Левая панель содержит виртуальные каталоги Друзья, Сообщества, Новости, Закладки и др.
Соответственно можно слушать свою музыку, друзей, групп. А так же музыку из новостей, и лайкнутых вами постов.

Консоль поддерживает следующий список команд:
* ['play'] - без аргументов - начать воспроизведение текущего плейлиста, с аргументами - аналогична комманде search
* ['stop', 's'] - остановить воспроизведение
* ['next'] - играть следующий трек
* ['prev'] - играть предыдущий трек
* ['volume', 'v'] - задать значение громкости - 0..100
* ['shuffle', 'sh'] - перемешать активный плейлист
* ['search', 's'] - искать заданного исполнителя. При этом композиции с одинаковым названием удаляются. То есть количество дублей сводится к минимуму
* ['radio', 'r'] - играть радио, на основе заданного исполнителя. Алгоритм используется от vk.com
* ['exit', 'quit', 'q'] - закрыть приложение

Перевод фокуса в консоль происходит клавишей Space. Из консоли в основной интерфейс - клавишей Esc.
Особо хочется отметить возможность работы плеера на мини-компьютерах Raspberry-Pi, Banana-Pi, CubieBoard и др. платформах, поддерживающих NodeJS.

Авторизация. Если в момент запуска плейер не обнаруживает конфигурационный файл($HOME/.config/vknp/config.json), то появляется попап с просьбой авторизоваться. Можно авторизоваться двумя способами
* первый сводится к нажатию кнопки получения ID, и последующем вводе его на интернет-странице плеера(которая сейчас представляет собой только поле для ввода, и кнопку получения токена). Подтверждение вами прав для приложения, генерации токена, и автоматическом получением его приложением. После этого остается его только перезапустить. Недостатком данного способа является невозможность получения прав для доступа к Стене пользователя, и соответственно, пропадает часть функционала -  нельзя получать группы новостей, нельзя получать список закладок(лайкнутые вами посты)
* второй способ менее удобный, но при этом доступен весь функционал. Нужно пройти по ссылке(на странице представлен укороченный вариант, но можно увидеть и полный url), и после редиректа прочитать сообщение от Администрации VK.COM. Понять, что вам это не грозит, скопировать содержимое адресной строки, и вставить в соответствующее поле в плеере и нажать либо Enter, либо кнопку Submit. Затем необходимо перезапустить приложение.
* прямой авторизации не предусмотрено, так как я считаю это не безопасным, и так же не хочу брать на себя ответственность в получении вашего логина и пароля

Плеер далек до идеала, в нем есть баги и огрехи, но работа над их исправлениями ведется и им вполне можно пользоваться.

Для работы требуется установленный Node.js
```
# apt-get install nodejs npm
```

Установить плеер можно локально, склонировав репозитарий к себе, и выполнив в каталоге с плеером npm install для установки зависимостей. Или глобально - коммандой sudo npm install -g vknplayer
Запуск. Если вы устанавливали через npm, то достаточно выпонить в консоли vknplayer. В противном случае выполните ./vknplayer.js или ./vknp из каталога с приложением. 
Из-за особеностей реализации модуля lame-node консоль периодически засирается всяким мусором. Исправить можно либо ресайзом окна, либо использованием bash-скрипта запуска **vknp**.

#В планах#

* исправление ошибок
* поддержка других музыкальных он-лайн сервисов
* веб-интерфейс

[blessed]:https://github.com/chjj/blessed
