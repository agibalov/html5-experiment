describe('binding', function() {
  it('can describe element with HTML markup, then manually compile, link and use', function() {
    var $injector = angular.injector(['ng']);
    var $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');

    var element = angular.element('<div><span>{{2 + 3}}</span></div>');
    expect(element.hasClass('ng-scope')).toBe(false);
    expect(element.html()).toBe('<span>{{2 + 3}}</span>');

    var elementLinkFunction = $compile(element); // this affects the element!
    expect(element.hasClass('ng-scope')).toBe(true);
    expect(element.html()).toBe('<span class="ng-binding">{{2 + 3}}</span>');

    var linkedElement = elementLinkFunction($rootScope);
    expect(linkedElement).toBe(element); // element and linkedElements are the same object
    expect(linkedElement.hasClass('ng-scope')).toBe(true);
    expect(linkedElement.html()).toBe('<span class="ng-binding">{{2 + 3}}</span>');

    $rootScope.$digest();
    expect(linkedElement.hasClass('ng-scope')).toBe(true);
    expect(linkedElement.html()).toBe('<span class="ng-binding">5</span>');
  });

  it('can describe element with HTML markup, then manually compile, link and use (short)', function() {
    var $injector = angular.injector(['ng']);
    var $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');

    var element = $compile('<div><span>{{2 + 3}}</span></div>')($rootScope);
    expect(element.html()).toBe('<span class="ng-binding">{{2 + 3}}</span>');

    $rootScope.$digest();
    expect(element.html()).toBe('<span class="ng-binding">5</span>');
  });

  it('can update element contents by updating the scope', function() {
    var $injector = angular.injector(['ng']);
    var $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');

    var element = $compile('<div>Hello, {{name}}!!!</div>')($rootScope);

    $rootScope.$digest();
    expect(element.html()).toBe('Hello, !!!');

    $rootScope.name = 'loki2302';
    expect(element.html()).toBe('Hello, !!!');

    $rootScope.$digest();
    expect(element.html()).toBe('Hello, loki2302!!!');

    $rootScope.name = 'Andrey';
    expect(element.html()).toBe('Hello, loki2302!!!');

    $rootScope.$digest();
    expect(element.html()).toBe('Hello, Andrey!!!');
  });

  it('can update the scope by triggering an element event', function() {
    var $injector = angular.injector(['ng']);
    var $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');

    var element = $compile('<div ng-click="clicked = !clicked"></div>')($rootScope);

    element.triggerHandler('click');
    expect($rootScope.clicked).toBe(true);

    element.triggerHandler('click');
    expect($rootScope.clicked).toBe(false);
  });
});