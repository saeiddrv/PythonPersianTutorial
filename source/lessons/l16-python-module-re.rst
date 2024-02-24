.. role:: emoji-size

.. meta::
   :description: پایتون به پارسی - کتاب آنلاین و آزاد آموزش زبان برنامه‌نویسی پایتون - درس شانزدهم: ماژول re (عبارات باقاعده) پایتون


.. _lesson-16:

درس ۱۶: ماژول re (عبارات باقاعده) پایتون
============================================================================

.. figure:: /_static/pages/16-python-regex-re.jpg
    :align: center
    :alt: کتابخانه استاندارد پایتون: re
    :class: page-image

    Photo by `Markus Winkler <https://unsplash.com/photos/afW1hht0NSs>`__

این درس در ادامه درس قبل «عبارات با قاعده یا Regular Expression» می‌باشد و به شرح برخی از تابع‌های کاربردی موجود در ماژول ``re`` از کتابخانه استاندارد زبان برنامه‌نویسی پایتون می‌پردازد. پیش از مطالعه این درس می‌بایست حتما درس قبل را نیز مطالعه کرده باشید.





:emoji-size:`✔` سطح: متوسط

----


.. contents:: سرفصل‌ها
    :depth: 3

----


.. _re-search-functions:

توابع جستجو، ماژول ``re`` پایتون
---------------------------------------

توابع پرکاربرد ماژول ``re`` پایتون مرتبط با عمل جستجو در یک متن عبارتند از: 

* ``search``
* ``match``  
* ``fullmatch``  
* ``findall``  
* ``finditer``  


.. _re-search:

تابع ``search``
~~~~~~~~~~~~~~~~~~~~~~

::

   search(pattern, string, flags=0)

تابع ``search`` به دنبال اولین انطباق pattern در string می‌گردد، در صورت موفقیت یک شی ``Match`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#match-objects>`__] و در غیر این صورت ``None`` برمی‌گرداند [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.search>`__]::

    >>> import re
    >>> 
    >>> match = re.search('Py...n', 'Python is great')
    >>> 
    >>> type(match)
    <class 're.Match'>


اجازه بدهید یادآوری کنیم که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> match = pattern.search('Python is great')

::

    >>> match = re.search('Py...n', 'Python is great')



.. _re-match-object:

شی ``Match`` پایتون
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


::

    >>> pattern = re.compile('Py...n')
    >>> match = pattern.search('Python is great')
    >>> 
    >>> if match:
    ...     print(match.group())
    ... else:
    ...     print("pattern not found")
    ... 
    Python
    >>> 

::

    >>> dir(match)
    ['__class__', '__copy__', '__deepcopy__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'end', 'endpos', 'expand', 'group', 'groupdict', 'groups', 'lastgroup', 'lastindex', 'pos', 're', 'regs', 'span', 'start', 'string']

در ادامه به بررسی برخی از متدهای مهم این شی می‌پردازیم:
  

 * ``Match.group`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.group>`__]::

     Match.group([group1, ...])

  این متد از شی ``Match``، گروه (های) تطبیق داده شده بر اساس الگو مورد نظر را برمی‌گرداند. این متد می‌تواند یک یا چند آرگومان عددی دریافت کند که معرف اندیس گروه مورد نظر می‌باشد. در حالت فراخوانی بدون آرگومان تمامی گروه‌های تطبیق داده شده به صورت یک مقدار رشته برگردانده می‌شود و در صورتی تنها یک مقدار به آن ارسال گردد، گروه تطبیق داده شده متناظر با آن اندیس (شمارش اندیس‌ها از یک است) در قالب یک شی رشته برگردانده می‌شود و در صورتی که بیش از یک اندیس به عنوان آرگومان ارسال گردد یک شی توپِل محتوی گروه‌های تطبیق داده شده برگردانده خواهد شد. چنانچه آرگومان ارسالی عددی منفی باشد یا اندیسی بالاتر از تعداد گروه‌های تطبیق داده شده باشد، یک استثنا ``IndexError`` رخ خواهد داد::

    >>> match = re.search("(\w+) (\w+)", "Isaac Newton, physicist") 
    >>> match.group()        # The entire match
    'Isaac Newton'
    >>> match.group(0)       # The entire match
    'Isaac Newton'
    >>> match.group(1)       # The first parenthesized subgroup.
    'Isaac'
    >>> match.group(2)       # The second parenthesized subgroup.
    'Newton'
    >>> match.group(1, 2)    # Multiple arguments give us a tuple.
    ('Isaac', 'Newton')

    >>> match.group(3)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    IndexError: no such group
    
  فراخوانی بدون آرگومان (یا ارسال آرگومان صفر - مقدار پیش‌فرض) این متد، تمام متن تطبیق داده شده را برمی‌گرداند::
  
  
    >>> pattern = re.compile('Py...n')
    >>> match = pattern.search('Python is great')
    >>> match.group()
    'Python'
    
    >>> match.group(0)
    'Python'



  * ``Match.groups`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.groups>`__]::

       Match.groups(default=None)

  این متد تمام گروه‌های تطبیق داده شده بر اساس الگو مورد نظر را در قالب یک شی توپِل برمی‌گرداند. این متد می‌تواند یک آرگومان بپذیرد که معرف مقدار پیش‌فرض برای جایگذاری گروه‌هایی است که در رشته ورودی تطبیق داده نشده‌اند، در حالت عادی (بدون ارسال آرگومان) این مقدار برابر با ``None`` است::

    >>> match = re.search("(\d+)\.(\d+)", "24.1632")
    >>> match.groups()
    ('24', '1632')

  ::

       >>> match = re.search("(\d+)\.?(\d+)?", "24")
       >>> match.groups()      # Second group defaults to None.
       ('24', None)
       >>> match.groups('0')   # Now, the second group defaults to '0'.
       ('24', '0')
       
       
  ::
  
      >>> pattern = re.compile('Py...n')  # The pattern is without grouping
      >>> match = pattern.search('Python is great')
      >>> match.groups()
      ()


  * ``Match.groupdict`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.groupdict>`__]::

      Match.groupdict(default=None)

    این متد یک شی دیکشنری (dict) حاوی حاصل تطابق تمام گروه‌های بانام (Named Groups) موجود در الگو را برمی‌گرداند::


      >>> import re

      >>> match = re.search("(?P<first_name>\w+) (?P<last_name>\w+)", "Elvis Presley")
      >>> match.groupdict()
      {'first_name': 'Elvis', 'last_name': 'Presley'}

      >>> match.group()
      'Elvis Presley'
      >>> match.group(1)
      'Elvis'
      >>> match.group(2)
      'Presley'

      >>> match.groups()
      ('Elvis', 'Presley')

    این متد نیز همانند متد ``groups`` یک پارامتر اختیاری دارد که در صورت ارسال آرگومان به آن به جای مقدار پیش‌فرض ``None`` برای حاصل عدم تطابق گروه‌های موجود در الگو قرار می‌گیرد::

      >>> import re

      >>> match = re.search("(?P<first_name>\w+) (?P<nick_name>`\w+`\s)?(?P<last_name>\w+)", "Elvis `The King` Presley")
      >>> match.groupdict()
      {'first_name': 'Elvis', 'nick_name': '`The King` ', 'last_name': 'Presley'}

      >>> match = re.search("(?P<first_name>\w+) (?P<nick_name>`\w+`\s)?(?P<last_name>\w+)", "Elvis Presley")
      >>> match.groupdict()
      {'first_name': 'Elvis', 'nick_name': None, 'last_name': 'Presley'}

      >>> match.groupdict("---") # or match.groupdict(default="---")
      {'first_name': 'Elvis', 'nick_name': '---', 'last_name': 'Presley'}



  * ``Match.expand`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.expand>`__]::

       Match.expand(template)

    این متد حاصل انطباق را در قالب ``template`` جایگذاری کرده و یک شی رشته جدید برمی‌گرداند. قالب در اینجا یک رشته است که در آن می‌توان به حاصل انطباق گروهبندی‌های موجود در الگو ارجاع داد به این صورت کرد که می‌توان گروه‌های بی‌نام موجود در الگو را با استفاده از ارجاع عددی به شماره اندیس آن‌ها به مانند ``1\``، ``2\``  یا ``<g<1\`` و گروه‌های بانام را با استفاده از نام گروه به مانند ``<g<name\`` در قالب موجود جایگذاری کرد. Escape character‌های موجود در قالب به کاراکترهای مناسب خود در متن خروجی تبدیل می‌شوند و از **نسخه 3.5 پایتون** گروه‌هایی که هیچ انطباقی نداشته‌اند با هیچی (empty string) جایگذاری می‌شوند::

        >>> import re

        >>> match = re.search('(\w+),(\w+),(\w+)', 'Jazz,Rock,Pop')
        >>> match.groups()
        ('Jazz', 'Rock', 'Pop')
        
        >>> match.expand('-->\1---->\2------>\3') # Warning!!!
        '-->\x01---->\x02------>\x03'

        >>> match.expand('-->\\1---->\\2------>\\3')
        '-->Jazz---->Rock------>Pop'

        >>> match.expand(r'-->\1---->\2------>\3')
        '-->Jazz---->Rock------>Pop'


    ::

          # \1, \2 and \3 are all valid escape characters

          \1  # (U+0001 or 0x01) stands for the ascii start-of-heading character
          \2  # (U+0002 or 0x02) stands for the ascii start-of-text character
          \3  # (U+0003 or 0x03) stands for the ascii end-of-text character

    .. note::
        در نمونه کد بالا، خروجی نخستین استفاده از متد ``expand`` متناسب با انتظار نیست، دلیل هم مربوط به وجود کاراکترهایی با ``\`` است (escape characters) که باعث بروز اخلال در تحلیل رشته قالب شده است. بهتر است همیشه در این مواقع از قوانین **raw string** پیروی نماییم: استفاده از ``\\`` به جای ``\`` (همانند ``n\\``) یا قرار دادن یک کاراکتر ``r`` یا ``R`` در ابتدای رشته (همانند ``'r'\n``). در این صورت کاراکترهایی همچون newline یا ``n\`` در رشته، معنای خود را از دست می‌دهند. (یادآوری از درس هفتم)

        در واقع مفسر پایتون پیش از قراردادن متن مورد نظر ما در قالب یک شی رشته (string) در حافظه (memory) آن را تحلیل و مقادیر متناسب با کاراکترهای ``\`` را در آن جایگذاری می‌کند که این کار ممکن است در هنگام استفاده ماژول ``re`` از آن شی رشته اخلال ایجاد کند. استفاده از **raw string**  باعث می‌شود مفسر پایتون متن مورد نظر را بدون تغییر در حافطه قرار دهد.


    .. tip::
        بلای Backslash [`اسناد پایتون <https://docs.python.org/3/howto/regex.html#the-backslash-plague>`__] 

        همیشه در هنگام کار با RegEx (نه فقط در زبان پایتون!) مواظب escape characters یا همان backslash characters باشید. تا این لحظه برای جلوگیری از پیچیدگی در مثال‌های ارائه شده مبحث RegEx از قرار دادن **raw string** صرف نظر شده بود اما از آنجا که الگوهای RegEx پر از ``\`` است همواره می‌بایست به لزوم استفاده از **raw string** فکر کنیم.

    ::

           >>> match = re.search(r'(?P<num>\d+)', 'Top 100 songs')
           >>> match.group(1)
           '100'

           >>> match.expand(r'--- \g<num> ---')
           '--- 100 ---'
           >>> match.expand(r'--- \g<1> ---')
           '--- 100 ---'




  * ``Match.start([group])`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.start>`__]    ``Match.end([group])`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.end>`__]

  متن رشته خروجی (تطبیق یافته بر اساس الگو مورد نظر) را در نظر بگیرید، متد ``start`` اندیس شروع این متن از رشته ورودی و متد ``end``  اندیس نقطه پایان را برمی‌گرداند. این دو متد می‌توانند یک آرگومان اختیاری نیز دریافت کنند که معرف اندیس یک گروه مشخص در الگو می‌باشد، با ارسال این آرگومان نتایج بر اساس تکه متن تطبیق داده شده با آن گروه برگردانده خواهد شد::

    >>> email = "tony@tiremove_thisger.net"
    >>> match = re.search("remove_this", email)
    >>> match.start()
    7
    >>> match.end()
    18
    >>> email[match.start() : match.end()]
    'remove_this'
    >>> email[:match.start()] + email[match.end():]
    'tony@tiger.net'

  ::

       >>> match = re.search(r"(\d+)\.(\d+)", "24.1632")

       >>> match.start()
       0
       >>> match.end()
       7

       >>> match.start(1)
       0
       >>> match.end(1)
       2

       >>> match.start(2)
       3
       >>> match.end(2)
       7
       >>> 


  * ``Match.span([group])`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.span>`__]

  این متد یک شی توپِل دوتایی از خروجی دو متد ``start``  و ``end``  را بر می‌گرداند و همانند آنها نیز یک آرگومان اختیاری دارد - نمونه خروجی::

    (m.start(group), m.end(group))

  ::

    >>> match = re.search(r"(\d+)\.(\d+)", "24.1632")
    >>> match.span()
    (0, 7)
    >>> match.span(1)
    (0, 2)
    >>> match.span(2)
    (3, 7)
    >>> match.span(3)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    IndexError: no such group

  * ``Match.re`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.re>`__]    ``Match.string`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.Match.string>`__]

  این دو متغیر به ترتیب حاوی  شی RegEx الگو و متن مورد نظر جهت انجام عملیات تطابق خواهند بود::

    >>> email = "tony@tiremove_thisger.net"
    >>> match = re.search("remove_this", email)

    >>> match.re
    re.compile('remove_this')

    >>> match.string
    'tony@tiremove_thisger.net'

    >>> match.string[match.start() : match.end()]
    'remove_this'

  ::

       >>> match = re.search(r"(\d+)\.(\d+)", "24.1632")

       >>> match.re
       re.compile('(\\d+)\\.(\\d+)')

       >>> match.string
       '24.1632'

.. _re-match:

تابع ``match``
~~~~~~~~~~~~~~~~~~~~~~

::

     match(pattern, string, flags=0)

تابع ``match`` از ابتدای string انطباق pattern را انجام می‌دهد، در صورت موفقیت یک شی ``Match`` و در غیر این صورت ``None`` برمی‌گرداند [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.match>`__]::

    >>> import re

    >>> match = re.match(r'\d+', '123@USERNAME')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>

    >>> match = re.match(r'\d+', 'USERNAME@123')
    >>> print(match)
    None


    >>> match = re.search(r'\d+', '123@USERNAME')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>

    >>> match = re.search(r'\d+', 'USERNAME@123')
    >>> print(match)
    <re.Match object; span=(9, 12), match='123'>


.. tip::

  تفاوت دو تابع ``match`` و ``search`` [`اسناد پایتون <https://docs.python.org/3/library/re.html#search-vs-match>`__]:

  هنگام استفاده از تابع ``match``، از همان ابتدای متن مورد نظر، می‌بایست تطابق با الگو صورت پذیرد (حتی در متن‌های چند سطری) ولی تابع ``search`` انجام انطباق را در هر جایی از متن دنبال می‌کند.

  هنگام استفاده از نشانه ``re.MULTILINE`` در تابع ``search``، کاراکتر ``^`` در الگو از معنای **ابتدای متن** به معنای **ابتدای هر سطر** تغییر می‌کند (درس قبل) ولی از نظر تابع ``match`` وجود کاراکتر ``^`` در الگو همواره به معنی ابتدای متن می‌باشد (نه هر سطر)::

      >>> import re
      >>> string = 'Perl\nPython\nRuby'  # 3 lines

      >>> match = re.search('^Perl', string)
      >>> print(match)
      <re.Match object; span=(0, 4), match='Perl'>

      >>> match = re.search('^Python', string)
      >>> print(match)
      None

      >>> match = re.search('^Python', string, re.MULTILINE)
      >>> print(match)
      <re.Match object; span=(5, 11), match='Python'>


      >>> match = re.match('^Perl', string)
      >>> print(match)
      <re.Match object; span=(0, 4), match='Perl'>

      >>> match = re.match('^Python', string, re.MULTILINE)
      >>> print(match)
      None


اجازه بدهید یادآوری کنیم که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> match = pattern.match('Python is great')

::

    >>> match = re.match('Py...n', 'Python is great')

.. _re-fullmatch:

تابع ``fullmatch``
~~~~~~~~~~~~~~~~~~~~~~

::

    fullmatch(pattern, string, flags=0)

این تابع (``fullmatch``) چنانچه تمام string با pattern انطباق داشته باشد یک شی ``Match`` و در غیر این صورت ``None`` برمی‌گرداند [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.fullmatch>`__] - این تابع از **پایتون نسخه 3.4** به بعد در دسترس است::

    >>> import re  # Python >= 3.4

    >>> match = re.fullmatch(r'\d+', '123@USERNAME')
    >>> print(match)
    None

    >>> match = re.fullmatch(r'\d+', '123')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>

**عملکرد نمونه کدهای زیر برابر هم هستند - به الگو و نام توابع توجه نمایید**::

    >>> match = re.search(r'^\d+$', '123')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>

    >>> match = re.match(r'\d+$', '123')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>

    >>> match = re.fullmatch(r'\d+', '123')
    >>> print(match)
    <re.Match object; span=(0, 3), match='123'>


همچنین باید یادآوری کنیم که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> match = pattern.fullmatch('Python')

::

    >>> match = re.fullmatch('Py...n', 'Python')


.. _re-findall:

تابع ``findall``
~~~~~~~~~~~~~~~~~~~~~~


::

     findall(pattern, string, flags=0)

این تابع (``findall``) حاصل تمام انطباق‌های ممکن pattern در string را در قالب یک لیست از رشته‌ها (نتایج) برمی‌گرداند [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.findall>`__]::

    >>> import re

    >>> string = "My number is 123456789 and my friend's number is 987654321"
    >>> results = re.findall(r'\d+', string)

    >>> type(results)
    <class 'list'>

    >>> print(results)
    ['123456789', '987654321']

تابع ``findall`` از سمت چپ string شروع به دنبال انطباق pattern در آن می‌گردد و نتایج را به ترتیب برمی‌گرداند. اگر الگو (pattern) شامل گروه باشد فقط نتایج مربوط به انطباق گروه را برمی‌گرداند و نه تمام الگو را::

    >>> results = re.findall(r'#(\w+)#', '#Perl#.#Python#.#Ruby#')
    >>> print(results)
    ['Perl', 'Python', 'Ruby']

    >>> results = re.findall(r'#\w+#', '#Perl#.#Python#.#Ruby#')
    >>> print(results)
    ['#Perl#', '#Python#', '#Ruby#']

چنانچه الگو شامل بیش از یک گروه باشد، خروجی تابع ``findall`` برابر است با یک لیست از توپِل‌ها که هر توپِل، حاصل یک دور انطباق است::

     >>> results = re.findall(r'(\w+)@(\d+)', 'Perl@1987,Python@1991,Ruby@1995')
     >>> print(results)
     [('Perl', '1987'), ('Python', '1991'), ('Ruby', '1995')]


یادآوری می‌شود که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> results = pattern.findall('PythonPythonPython')

::

    >>> results = re.findall('Py...n', 'PythonPythonPython')

.. _re-finditer:

تابع ``finditer``
~~~~~~~~~~~~~~~~~~~~~~

:: 

    finditer(pattern, string, flags=0)

خروجی این تابع (``finditer``) یک شی ``iterator`` (شی تکرارکننده - درس نهم) است و حاصل هر بار پیمایش آن یک شی ``Match`` می‌باشد که همانند تابع ``findall`` از سمت چپ string شروع به دنبال انطباق pattern در آن می‌گردد و نتایج را به ترتیب برمی‌گرداند. [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.finditer>`__]::

    >>> import re

    >>> string = "My number is 123456789 and my friend's number is 987654321"
    >>> result = re.finditer(r'\d+', string)

    >>> type(result)
    <class 'callable_iterator'>

    >>> result.__next__()
    <re.Match object; span=(13, 22), match='123456789'>

    >>> result.__next__()
    <re.Match object; span=(49, 58), match='987654321'>

    >>> result.__next__()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    StopIteration

::

       >>> for match in re.finditer(r'#(\w+)#', '#Perl#.#Python#.#Ruby#'):
       ...     print(match)
       ... 
       <re.Match object; span=(0, 6), match='#Perl#'>
       <re.Match object; span=(7, 15), match='#Python#'>
       <re.Match object; span=(16, 22), match='#Ruby#'>


       >>> for match in re.finditer(r'#\w+#', '#Perl#.#Python#.#Ruby#'):
       ...     print(match)
       ... 
       <re.Match object; span=(0, 6), match='#Perl#'>
       <re.Match object; span=(7, 15), match='#Python#'>
       <re.Match object; span=(16, 22), match='#Ruby#'>

::

          >>> for match in re.finditer(r'(\w+)@(\d+)', 'Perl@1987,Python@1991,Ruby@1995'):
         ...     print(match)
         ... 
         <re.Match object; span=(0, 9), match='Perl@1987'>
         <re.Match object; span=(10, 21), match='Python@1991'>
         <re.Match object; span=(22, 31), match='Ruby@1995'>


یادآوری می‌شود که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> result = pattern.finditer('PythonPythonPython')

::

    >>> result = re.finditer('Py...n', 'PythonPythonPython')


.. _re-replace-methods:

توابع جایگزینی، ماژول ``re`` پایتون
---------------------------------------

توابع پرکاربرد ماژول ``re`` پایتون مرتبط با عمل جایگزینی (replace) یک متن عبارتند از: 

* ``sub``
* ``subn``  


.. _re-sub:

تابع ``sub``
~~~~~~~~~~~~~~~~~~~~~~


::

    sub(pattern, repl, string, count=0, flags=0)

این تابع (``sub``) حاصل انطباق‌های ممکن pattern در string را در repl جایگذاری می‌کند. این تابع همچنین دو پارامتر اختیاری دارد (flags و count)، پیش‌تر در مورد flags صحبت کردیم (که از نسخه 3.1 پایتون به این تابع اضافه شده است) و count نیز بیانگر ماکزیمم تعداد انطباقی است که می‌خواهیم در repl جایگذاری شود - این مقدار می‌بایست یک عدد مثبت باشد و مقدار صفر (مقدار پیش‌فرض) برای آن به معنی هر تعداد (نامحدود) خواهد بود. پارامتر repl در این تابع می‌تواند از نوع رشته یا تابع باشد، ابتدا حالت رشته را بررسی می‌کنیم [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.sub>`__]::

     >>> import re

     >>> string = 'Perl@1987,Python@1991,Ruby@1995'
     >>> repl = ' - '
     >>> pattern = r'@\d+,?'

     >>> result = re.sub(pattern, repl, string)

     >>> type(result)
     <class 'str'>

     >>> print(result)
     Perl - Python - Ruby - 

     >>> result = re.sub(pattern, repl, string, 2) #  count=2
     >>> print(result)
     Perl - Python - Ruby@1995

     >>> result = re.sub(pattern, repl, string, 1) #  count=1
     >>> print(result)
     Perl - Python@1991,Ruby@1995

متد ``expand`` از شی Match که در ابتدای این درس مطرح شد را بیاد بیاورید، بدیهی است که pattern می‌تواند شامل گروهبندی نیز باشد، در این شرایط آنچه از قوانین موجود در پارامتر template متد ``expand`` گفته شد در repl (در حالتی که یک شی رشته است) نیز صدق می‌کند::

     >>> result = re.sub(r'(\w+),(\w+),(\w+)', r'(\1) (\2) (\3)', 'Jazz,Rock,Pop')
     >>> print(result)
     (Jazz) (Rock) (Pop)

     >>> re.sub(r'(\w+),(\w+),(\w+)', r'(\g<1>) (\g<2>) (\g<3>)', 'Jazz,Rock,Pop')
     '(Jazz) (Rock) (Pop)'


::

      >>> re.sub(r'(?P<num>\d+)', r'#\g<num>#', 'Top 100 songs')
      'Top #100# songs'

به مثالی دیگر توجه نمایید::

    >>> re.sub('x*', '-', 'abc@123,456')
    '-a-b-c-@-1-2-3-,-4-5-6-'

الگو مورد استفاده برای متن مثال بالا یک Zero-length Match است (درس قبل) - [`regex101@ تست آنلاین <https://regex101.com/r/n0I6JU/1>`__] 


.. tip::
  
  چنانچه تابع ``sub`` هیچ انطباقی از pattern در string پیدا نکند، مقدار string را بدون تغییر برمی‌گرداند::

       >>> re.sub(r'\d', '-', 'abc@xyz') #  Without matching
       'abc@xyz'

       >>> re.sub(r'\d', '-', 'abc@123')
       'abc@---'


گفتیم پارامتر repl در این تابع می‌تواند از نوع تابع باشد. در این صورت ``sub`` در هر بار انطباق تابع ``repl`` را فراخوانی می‌کند و شی ``Match`` مربوط را به آن ارسال می‌کند::

     >>> import re

     >>> def mask_numbers(match):
     ...     string = match.group(0)  # The matching string
     ...
     ...     # string.isdigit() returns True if all characters in string are digits
     ...     if string.isdigit():
     ...         return '_' * len(string)
     ...     else:
     ...         return string
     ... 
     >>> 

     >>> re.sub(r'\w+', mask_numbers, 'Perl.1987.Python.1991.Ruby.1995')
     'Perl.____.Python.____.Ruby.____'

     >>> re.sub(r'\w+', mask_numbers, 'My ID is 123.45679 and your ID is 98521.2')
     'My ID is ___._____ and your ID is _____._'


::

    >>> re.sub(r'\d+', lambda match : '_' * len(match.group(0)), 'Perl.1987.Python.1991.Ruby.1995')
    'Perl.____.Python.____.Ruby.____'

    >>> re.sub(r'\d+', lambda match : '_' * len(match.group(0)), 'My ID is 123.45679 and your ID is 98521.2')
    'My ID is ___._____ and your ID is _____._'

*lambda در درس سیزدهم بررسی شده است.*



یادآوری می‌شود که دو نمونه کد زیر عملکردی معادل یکدیگر دارند::


    >>> pattern = re.compile('Py...n')
    >>> result = pattern.sub('*', 'PythonPythonPython')

::

    >>> result = re.sub('Py...n', '*', 'PythonPythonPython')


.. _re-subn:

تابع ``subn``
~~~~~~~~~~~~~~~~~~~~~~

::

    subn(pattern, repl, string, count=0, flags=0)

عملکرد این تابع (``subn``) همانند تابع ``sub`` است. تنها تفاوت در خروجی آن‌هاست، تابع ``subn`` یک شی توپِل محتوی نتیجه و تعداد عملیات جایگذاری را برمی‌گرداند [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.subn>`__]::

    >>> import re

    >>> string = 'Perl@1987,Python@1991,Ruby@1995'
    >>> repl = ' - '
    >>> pattern = r'@\d+,?'

    >>> result = re.subn(pattern, repl, string)

    >>> type(result)
    <class 'tuple'>

    >>> result
    ('Perl - Python - Ruby - ', 3)

    >>> re.subn(pattern, repl, string, count=2)
    ('Perl - Python - Ruby@1995', 2)

    >>> re.subn(pattern, repl, string, count=1)
    ('Perl - Python@1991,Ruby@1995', 1)


.. _re-split-methods:

توابع جداسازی، ماژول ``re`` پایتون
---------------------------------------

توابع پرکاربرد ماژول ``re`` پایتون مرتبط با عمل جداسازی بخش (هایی) از متن عبارتند از: 

* ``split``


.. _re-split:


تابع ``split``
~~~~~~~~~~~~~~~~~~~~~~

::

   split(pattern, string, maxsplit=0, flags=0)

این تابع (``split``) محتوای متن string را بر اساس الگو pattern جدا (split) می‌کند و خروجی آن یک شی لیست از رشته‌ها خواهد بود. این تابع همچنین علاوه بر پارامتر flags (که از نسخه 3.1 پایتون به این تابع اضافه شده است) یک پارامتر اختیاری دیگر نیز با نام maxsplit دارد که تعیین کننده ماکزیمم تعداد جداسازی خواهد بود - این مقدار می‌بایست یک عدد مثبت باشد و مقدار صفر (مقدار پیش‌فرض) برای آن به معنی هر تعداد (نامحدود) خواهد بود. [`اسناد پایتون <https://docs.python.org/3/library/re.html#re.split>`__]::

    >>> import re

    >>> string = 'Perl,Python,Ruby'
    >>> pattern = ','

    >>> result = re.split(pattern, string)

    >>> type(result)
    <class 'list'>

    >>> result
    ['Perl', 'Python', 'Ruby']

    >>> re.split(pattern, string, maxsplit=1)
    ['Perl', 'Python,Ruby']

    >>> re.split(pattern, string, maxsplit=2)
    ['Perl', 'Python', 'Ruby']

اگر الگو شامل پرانتز یا همان گروهبندی معمولی باشد، خروجی تابع ``split`` شامل جداکننده‌ها نیز می‌باشد::

    >>> re.split('(_)', 'Perl_Python_Ruby')
    ['Perl', '_', 'Python', '_', 'Ruby']

به نمونه کد پایین توجه نمایید::

    >>> re.split('/', '/Perl/Python/Ruby/')
    ['', 'Perl', 'Python', 'Ruby', '']

    >>> re.split('(/)', '/Perl/Python/Ruby/')
    ['', '/', 'Perl', '/', 'Python', '/', 'Ruby', '/', '']

**همانطور که مشاهده می‌شود، خروجی شامل دو رشته خالی در ابتدا و انتها می‌باشد. در مواقعی که جداکننده (delimiter) در نقاط ابتدایی و پایانی متن قرار دارد می‌بایست بروز همچین نتیجه‌ای را پیش‌بینی نمایید.**


چنانچه در مسئله شما قرار گرفتن جداکننده در خروجی مطلوب نیست می‌توانید از طرح non-capturing پرانتزها (درس قبل) استفاده کنید::

    >>> re.split('(?:_)', 'Perl_Python_Ruby')
    ['Perl', 'Python', 'Ruby']

    >>> re.split('(?:/)', '/Perl/Python/Ruby/')
    ['', 'Perl', 'Python', 'Ruby', '']



|

----

:emoji-size:`😊` امیدوارم مفید بوده باشه




