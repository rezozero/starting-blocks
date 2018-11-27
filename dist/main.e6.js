/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file EventTypes.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

/**
 * Before initialize XHR request to load new page.
 *
 * @type {String}
 */
const BEFORE_PAGE_LOAD = 'SB_BEFORE_PAGE_LOAD';
/**
 * After XHR request succeeded.
 *
 * @type {String}
 */

const AFTER_PAGE_LOAD = 'SB_AFTER_PAGE_LOAD';
/**
 * After Dom service appended new page DOM to page-container.
 *
 * @type {String}
 */

const AFTER_DOM_APPENDED = 'SB_AFTER_DOM_APPENDED';
/**
 * When new page container is ready.
 *
 * @type {String}
 */

const CONTAINER_READY = 'SB_CONTAINER_READY';
/**
 * After PageBuilder create new page instance.
 *
 * @type {String}
 */

const AFTER_PAGE_BOOT = 'SB_AFTER_PAGE_BOOT';
/**
 * Before page begins to show, right after assets are loaded (images).
 *
 * @type {String}
 */

const BEFORE_PAGE_SHOW = 'SB_BEFORE_PAGE_SHOW';
/**
 * After page showed.
 *
 * @type {String}
 */

const AFTER_PAGE_SHOW = 'SB_AFTER_PAGE_SHOW';
/**
 * Before page begins to hide.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */

const BEFORE_PAGE_HIDE = 'SB_BEFORE_PAGE_HIDE';
/**
 * After page hiding animation.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */

const AFTER_PAGE_HIDE = 'SB_AFTER_PAGE_HIDE';
/**
 * Before page transition begin.
 *
 * @type {String}
 */

const TRANSITION_START = 'SB_TRANSITION_START';
/**
 * After page transition completed.
 *
 * @type {String}
 */

const TRANSITION_COMPLETE = 'SB_TRANSITION_COMPLETE';

var EventTypes = /*#__PURE__*/Object.freeze({
  BEFORE_PAGE_LOAD: BEFORE_PAGE_LOAD,
  AFTER_PAGE_LOAD: AFTER_PAGE_LOAD,
  AFTER_DOM_APPENDED: AFTER_DOM_APPENDED,
  CONTAINER_READY: CONTAINER_READY,
  AFTER_PAGE_BOOT: AFTER_PAGE_BOOT,
  BEFORE_PAGE_SHOW: BEFORE_PAGE_SHOW,
  AFTER_PAGE_SHOW: AFTER_PAGE_SHOW,
  BEFORE_PAGE_HIDE: BEFORE_PAGE_HIDE,
  AFTER_PAGE_HIDE: AFTER_PAGE_HIDE,
  TRANSITION_START: TRANSITION_START,
  TRANSITION_COMPLETE: TRANSITION_COMPLETE
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bottle = createCommonjsModule(function (module, exports) {
(function(undefined) {
    /**
     * BottleJS v1.7.1 - 2018-05-03
     * A powerful dependency injection micro container
     *
     * Copyright (c) 2018 Stephen Young
     * Licensed MIT
     */
    var Bottle;
    
    /**
     * String constants
     */
    var DELIMITER = '.';
    var FUNCTION_TYPE = 'function';
    var STRING_TYPE = 'string';
    var GLOBAL_NAME = '__global__';
    var PROVIDER_SUFFIX = 'Provider';
    
    /**
     * Unique id counter;
     *
     * @type Number
     */
    var id = 0;
    
    /**
     * Local slice alias
     *
     * @type Functions
     */
    var slice = Array.prototype.slice;
    
    /**
     * Iterator used to walk down a nested object.
     *
     * If Bottle.config.strict is true, this method will throw an exception if it encounters an
     * undefined path
     *
     * @param Object obj
     * @param String prop
     * @return mixed
     * @throws Error if Bottle is unable to resolve the requested service.
     */
    var getNested = function getNested(obj, prop) {
        var service = obj[prop];
        if (service === undefined && Bottle.config.strict) {
            throw new Error('Bottle was unable to resolve a service.  `' + prop + '` is undefined.');
        }
        return service;
    };
    
    /**
     * Get a nested bottle. Will set and return if not set.
     *
     * @param String name
     * @return Bottle
     */
    var getNestedBottle = function getNestedBottle(name) {
        var bottle;
        if (!this.nested[name]) {
            bottle = Bottle.pop();
            this.nested[name] = bottle;
            this.factory(name, function SubProviderFactory() {
                return bottle.container;
            });
        }
        return this.nested[name];
    };
    
    /**
     * Get a service stored under a nested key
     *
     * @param String fullname
     * @return Service
     */
    var getNestedService = function getNestedService(fullname) {
        return fullname.split(DELIMITER).reduce(getNested, this);
    };
    
    /**
     * Function used by provider to set up middleware for each request.
     *
     * @param Number id
     * @param String name
     * @param Object instance
     * @param Object container
     * @return void
     */
    var applyMiddleware = function applyMiddleware(middleware, name, instance, container) {
        var descriptor = {
            configurable : true,
            enumerable : true
        };
        if (middleware.length) {
            descriptor.get = function getWithMiddlewear() {
                var index = 0;
                var next = function nextMiddleware(err) {
                    if (err) {
                        throw err;
                    }
                    if (middleware[index]) {
                        middleware[index++](instance, next);
                    }
                };
                next();
                return instance;
            };
        } else {
            descriptor.value = instance;
            descriptor.writable = true;
        }
    
        Object.defineProperty(container, name, descriptor);
    
        return container[name];
    };
    
    /**
     * Register middleware.
     *
     * @param String name
     * @param Function func
     * @return Bottle
     */
    var middleware = function middleware(fullname, func) {
        var parts, name;
        if (typeof fullname === FUNCTION_TYPE) {
            func = fullname;
            fullname = GLOBAL_NAME;
        }
    
        parts = fullname.split(DELIMITER);
        name = parts.shift();
        if (parts.length) {
            getNestedBottle.call(this, name).middleware(parts.join(DELIMITER), func);
        } else {
            if (!this.middlewares[name]) {
                this.middlewares[name] = [];
            }
            this.middlewares[name].push(func);
        }
        return this;
    };
    
    /**
     * Used to process decorators in the provider
     *
     * @param Object instance
     * @param Function func
     * @return Mixed
     */
    var reducer = function reducer(instance, func) {
        return func(instance);
    };
    
    
    /**
     * Get decorators and middleware including globals
     *
     * @return array
     */
    var getWithGlobal = function getWithGlobal(collection, name) {
        return (collection[name] || []).concat(collection.__global__ || []);
    };
    
    
    /**
     * Create the provider properties on the container
     *
     * @param String name
     * @param Function Provider
     * @return Bottle
     */
    var createProvider = function createProvider(name, Provider) {
        var providerName, properties, container, id, decorators, middlewares;
    
        id = this.id;
        container = this.container;
        decorators = this.decorators;
        middlewares = this.middlewares;
        providerName = name + PROVIDER_SUFFIX;
    
        properties = Object.create(null);
        properties[providerName] = {
            configurable : true,
            enumerable : true,
            get : function getProvider() {
                var instance = new Provider();
                delete container[providerName];
                container[providerName] = instance;
                return instance;
            }
        };
    
        properties[name] = {
            configurable : true,
            enumerable : true,
            get : function getService() {
                var provider = container[providerName];
                var instance;
                if (provider) {
                    // filter through decorators
                    instance = getWithGlobal(decorators, name).reduce(reducer, provider.$get(container));
    
                    delete container[providerName];
                    delete container[name];
                }
                return instance === undefined ? instance : applyMiddleware(getWithGlobal(middlewares, name),
                    name, instance, container);
            }
        };
    
        Object.defineProperties(container, properties);
        return this;
    };
    
    
    /**
     * Register a provider.
     *
     * @param String fullname
     * @param Function Provider
     * @return Bottle
     */
    var provider = function provider(fullname, Provider) {
        var parts, name;
        parts = fullname.split(DELIMITER);
        if (this.providerMap[fullname] && parts.length === 1 && !this.container[fullname + PROVIDER_SUFFIX]) {
            return console.error(fullname + ' provider already instantiated.');
        }
        this.originalProviders[fullname] = Provider;
        this.providerMap[fullname] = true;
    
        name = parts.shift();
    
        if (parts.length) {
            getNestedBottle.call(this, name).provider(parts.join(DELIMITER), Provider);
            return this;
        }
        return createProvider.call(this, name, Provider);
    };
    
    /**
     * Register a factory inside a generic provider.
     *
     * @param String name
     * @param Function Factory
     * @return Bottle
     */
    var factory = function factory(name, Factory) {
        return provider.call(this, name, function GenericProvider() {
            this.$get = Factory;
        });
    };
    
    /**
     * Private helper for creating service and service factories.
     *
     * @param String name
     * @param Function Service
     * @return Bottle
     */
    var createService = function createService(name, Service, isClass) {
        var deps = arguments.length > 3 ? slice.call(arguments, 3) : [];
        var bottle = this;
        return factory.call(this, name, function GenericFactory() {
            var serviceFactory = Service; // alias for jshint
            var args = deps.map(getNestedService, bottle.container);
    
            if (!isClass) {
                return serviceFactory.apply(null, args);
            }
            return new (Service.bind.apply(Service, [null].concat(args)))();
        });
    };
    
    /**
     * Register a class service
     *
     * @param String name
     * @param Function Service
     * @return Bottle
     */
    var service = function service(name, Service) {
        return createService.apply(this, [name, Service, true].concat(slice.call(arguments, 2)));
    };
    
    /**
     * Register a function service
     */
    var serviceFactory = function serviceFactory(name, factoryService) {
        return createService.apply(this, [name, factoryService, false].concat(slice.call(arguments, 2)));
    };
    
    /**
     * Define a mutable property on the container.
     *
     * @param String name
     * @param mixed val
     * @return void
     * @scope container
     */
    var defineValue = function defineValue(name, val) {
        Object.defineProperty(this, name, {
            configurable : true,
            enumerable : true,
            value : val,
            writable : true
        });
    };
    
    /**
     * Iterator for setting a plain object literal via defineValue
     *
     * @param Object container
     * @param string name
     */
    var setValueObject = function setValueObject(container, name) {
        var nestedContainer = container[name];
        if (!nestedContainer) {
            nestedContainer = {};
            defineValue.call(container, name, nestedContainer);
        }
        return nestedContainer;
    };
    
    
    /**
     * Register a value
     *
     * @param String name
     * @param mixed val
     * @return Bottle
     */
    var value = function value(name, val) {
        var parts;
        parts = name.split(DELIMITER);
        name = parts.pop();
        defineValue.call(parts.reduce(setValueObject, this.container), name, val);
        return this;
    };
    
    /**
     * Define an enumerable, non-configurable, non-writable value.
     *
     * @param String name
     * @param mixed value
     * @return undefined
     */
    var defineConstant = function defineConstant(name, value) {
        Object.defineProperty(this, name, {
            configurable : false,
            enumerable : true,
            value : value,
            writable : false
        });
    };
    
    /**
     * Register a constant
     *
     * @param String name
     * @param mixed value
     * @return Bottle
     */
    var constant = function constant(name, value) {
        var parts = name.split(DELIMITER);
        name = parts.pop();
        defineConstant.call(parts.reduce(setValueObject, this.container), name, value);
        return this;
    };
    
    /**
     * Register decorator.
     *
     * @param String fullname
     * @param Function func
     * @return Bottle
     */
    var decorator = function decorator(fullname, func) {
        var parts, name;
        if (typeof fullname === FUNCTION_TYPE) {
            func = fullname;
            fullname = GLOBAL_NAME;
        }
    
        parts = fullname.split(DELIMITER);
        name = parts.shift();
        if (parts.length) {
            getNestedBottle.call(this, name).decorator(parts.join(DELIMITER), func);
        } else {
            if (!this.decorators[name]) {
                this.decorators[name] = [];
            }
            this.decorators[name].push(func);
        }
        return this;
    };
    
    /**
     * Register a function that will be executed when Bottle#resolve is called.
     *
     * @param Function func
     * @return Bottle
     */
    var defer = function defer(func) {
        this.deferred.push(func);
        return this;
    };
    
    
    /**
     * Immediately instantiates the provided list of services and returns them.
     *
     * @param Array services
     * @return Array Array of instances (in the order they were provided)
     */
    var digest = function digest(services) {
        return (services || []).map(getNestedService, this.container);
    };
    
    /**
     * Register an instance factory inside a generic factory.
     *
     * @param {String} name - The name of the service
     * @param {Function} Factory - The factory function, matches the signature required for the
     * `factory` method
     * @return Bottle
     */
    var instanceFactory = function instanceFactory(name, Factory) {
        return factory.call(this, name, function GenericInstanceFactory(container) {
            return {
                instance : Factory.bind(Factory, container)
            };
        });
    };
    
    /**
     * A filter function for removing bottle container methods and providers from a list of keys
     */
    var byMethod = function byMethod(name) {
        return !/^\$(?:decorator|register|list)$|Provider$/.test(name);
    };
    
    /**
     * List the services registered on the container.
     *
     * @param Object container
     * @return Array
     */
    var list = function list(container) {
        return Object.keys(container || this.container || {}).filter(byMethod);
    };
    
    /**
     * Named bottle instances
     *
     * @type Object
     */
    var bottles = {};
    
    /**
     * Get an instance of bottle.
     *
     * If a name is provided the instance will be stored in a local hash.  Calling Bottle.pop multiple
     * times with the same name will return the same instance.
     *
     * @param String name
     * @return Bottle
     */
    var pop = function pop(name) {
        var instance;
        if (typeof name === STRING_TYPE) {
            instance = bottles[name];
            if (!instance) {
                bottles[name] = instance = new Bottle();
                instance.constant('BOTTLE_NAME', name);
            }
            return instance;
        }
        return new Bottle();
    };
    
    /**
     * Clear all named bottles.
     */
    var clear = function clear(name) {
        if (typeof name === STRING_TYPE) {
            delete bottles[name];
        } else {
            bottles = {};
        }
    };
    
    /**
     * Register a service, factory, provider, or value based on properties on the object.
     *
     * properties:
     *  * Obj.$name   String required ex: `'Thing'`
     *  * Obj.$type   String optional 'service', 'factory', 'provider', 'value'.  Default: 'service'
     *  * Obj.$inject Mixed  optional only useful with $type 'service' name or array of names
     *  * Obj.$value  Mixed  optional Normally Obj is registered on the container.  However, if this
     *                       property is included, it's value will be registered on the container
     *                       instead of the object itsself.  Useful for registering objects on the
     *                       bottle container without modifying those objects with bottle specific keys.
     *
     * @param Function Obj
     * @return Bottle
     */
    var register = function register(Obj) {
        var value = Obj.$value === undefined ? Obj : Obj.$value;
        return this[Obj.$type || 'service'].apply(this, [Obj.$name, value].concat(Obj.$inject || []));
    };
    
    /**
     * Deletes providers from the map and container.
     *
     * @param String name
     * @return void
     */
    var removeProviderMap = function resetProvider(name) {
        delete this.providerMap[name];
        delete this.container[name];
        delete this.container[name + PROVIDER_SUFFIX];
    };
    
    /**
     * Resets providers on a bottle instance. If 'names' array is provided, only the named providers will be reset.
     *
     * @param Array names
     * @return void
     */
    var resetProviders = function resetProviders(names) {
        var tempProviders = this.originalProviders;
        var shouldFilter = Array.isArray(names);
    
        Object.keys(this.originalProviders).forEach(function resetProvider(originalProviderName) {
            if (shouldFilter && names.indexOf(originalProviderName) === -1) {
                return;
            }
            var parts = originalProviderName.split(DELIMITER);
            if (parts.length > 1) {
                parts.forEach(removeProviderMap, getNestedBottle.call(this, parts[0]));
            }
            removeProviderMap.call(this, originalProviderName);
            this.provider(originalProviderName, tempProviders[originalProviderName]);
        }, this);
    };
    
    
    /**
     * Execute any deferred functions
     *
     * @param Mixed data
     * @return Bottle
     */
    var resolve = function resolve(data) {
        this.deferred.forEach(function deferredIterator(func) {
            func(data);
        });
    
        return this;
    };
    
    
    /**
     * Bottle constructor
     *
     * @param String name Optional name for functional construction
     */
    Bottle = function Bottle(name) {
        if (!(this instanceof Bottle)) {
            return Bottle.pop(name);
        }
    
        this.id = id++;
    
        this.decorators = {};
        this.middlewares = {};
        this.nested = {};
        this.providerMap = {};
        this.originalProviders = {};
        this.deferred = [];
        this.container = {
            $decorator : decorator.bind(this),
            $register : register.bind(this),
            $list : list.bind(this)
        };
    };
    
    /**
     * Bottle prototype
     */
    Bottle.prototype = {
        constant : constant,
        decorator : decorator,
        defer : defer,
        digest : digest,
        factory : factory,
        instanceFactory: instanceFactory,
        list : list,
        middleware : middleware,
        provider : provider,
        resetProviders : resetProviders,
        register : register,
        resolve : resolve,
        service : service,
        serviceFactory : serviceFactory,
        value : value
    };
    
    /**
     * Bottle static
     */
    Bottle.pop = pop;
    Bottle.clear = clear;
    Bottle.list = list;
    
    /**
     * Global config
     */
    Bottle.config = {
        strict : false
    };
    
    /**
     * Exports script adapted from lodash v2.4.1 Modern Build
     *
     * @see http://lodash.com/
     */
    
    /**
     * Valid object type map
     *
     * @type Object
     */
    var objectTypes = {
        'function' : true,
        'object' : true
    };
    
    (function exportBottle(root) {
    
        /**
         * Free variable exports
         *
         * @type Function
         */
        var freeExports = exports && !exports.nodeType && exports;
    
        /**
         * Free variable module
         *
         * @type Object
         */
        var freeModule = module && !module.nodeType && module;
    
        /**
         * CommonJS module.exports
         *
         * @type Function
         */
        var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    
        /**
         * Free variable `global`
         *
         * @type Object
         */
        var freeGlobal = objectTypes[typeof commonjsGlobal] && commonjsGlobal;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
            root = freeGlobal;
        }
    
        /**
         * Export
         */
        if (typeof undefined === FUNCTION_TYPE && typeof undefined.amd === 'object' && undefined.amd) {
            root.Bottle = Bottle;
            undefined(function() { return Bottle; });
        } else if (freeExports && freeModule) {
            if (moduleExports) {
                (freeModule.exports = Bottle).Bottle = Bottle;
            } else {
                freeExports.Bottle = Bottle;
            }
        } else {
            root.Bottle = Bottle;
        }
    }((objectTypes[typeof window] && window) || this));
    
}.call(commonjsGlobal));
});

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Events.js
 * @author Ambroise Maupate
 */

/**
 * Event dispatcher.
 */
class Dispatcher {
  static commit(eventType, detail) {
    const event = new window.CustomEvent(eventType, {
      detail
    });
    console.debug('🚩 Dispatched ' + eventType);
    window.dispatchEvent(event);
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file UnknownServiceException.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class UnknownServiceException extends Error {
  constructor(id) {
    super(`Service "${id}" is not defined`);
    this.name = `UnknownServiceException`;
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file DependencyNotFulfilledException.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class DependencyNotFulfilledException extends Error {
  constructor(firstServiceName, secondeServiceName) {
    super(`Object of type "${firstServiceName}" needs "${secondeServiceName}" service`);
    this.name = `DependencyNotFulfilledException`;
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractService.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class AbstractService {
  constructor(container = {}, serviceName = 'AbstractService', dependencies = ['Config']) {
    this.container = container;
    this.serviceName = serviceName;
    console.debug(`${serviceName} awake`);
    this.checkDependencies(dependencies);
  }

  init() {}

  hasService(serviceName) {
    return this.container.hasOwnProperty(serviceName);
  }

  checkDependencies(dependencies = []) {
    for (const serviceName of dependencies) {
      if (!this.hasService(serviceName)) {
        throw new DependencyNotFulfilledException(this.serviceName, serviceName);
      }
    }
  }

  getService(serviceName) {
    if (!this.hasService(serviceName)) {
      throw new UnknownServiceException(serviceName);
    }

    return this.container[serviceName];
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractBootableService.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class AbstractBootableService extends AbstractService {
  boot() {
    console.debug(`${this.serviceName} boot`);
  }

}

/**
 * @file PageBuilder.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
/**
 * PageBuilder.
 */

class PageBuilder extends AbstractBootableService {
  constructor(container) {
    super(container, 'PageBuilder', ['Dom']);

    if (!window.location.origin) {
      window.location.origin = window.location.protocol + '//' + window.location.host;
    }
    /**
     * Page instance
     * @type {(AbstractPage|null)}
     */


    this.page = null; // Bind methods

    this.buildPage = this.buildPage.bind(this);
  }

  boot() {
    super.boot(); // Build first page with static context

    this.buildPage(this.getService('Dom').getContainer(), 'static');
  }
  /**
   * Build a new page instance.
   *
   * @param {HTMLElement} container
   * @param {String} context
   * @returns {AbstractPage|null}
   */


  buildPage(rootElement, context = 'ajax') {
    let nodeTypeName = this.getService('Dom').getNodeType(rootElement);

    if (this.hasService(nodeTypeName)) {
      this.page = this.getService(nodeTypeName).instance();
    } else {
      nodeTypeName = 'AbstractPage';
      this.page = this.getService('AbstractPage').instance();
    } // Set some values


    this.page.type = nodeTypeName;
    this.page.context = context;
    this.page.id = rootElement.id;
    this.page.rootElement = rootElement;
    this.page.name = rootElement.hasAttribute('data-node-name') ? rootElement.getAttribute('data-node-name') : '';
    this.page.metaTitle = rootElement.hasAttribute('data-meta-title') ? rootElement.getAttribute('data-meta-title') : '';
    this.page.isHome = rootElement.getAttribute('data-is-home') === '1';
    this.page.init(); // Dispatch an event to inform that the new page is ready

    Dispatcher.commit(AFTER_PAGE_BOOT, this.page);
    return this.page;
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractBlockBuilder.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class AbstractBlockBuilder extends AbstractService {
  /**
   * Returns an `AbstractBlock` child class instance
   * according to the nodeTypeName or an AbstractBlock as default.
   *
   * Comment out the default case if you don’t want a default block to be instantiated
   * for each block.
   *
   * @param  {String} blockType
   * @return {AbstractBlock|null}
   */
  async getBlockInstance(blockType) {
    return null;
  }

}

/*
 * Copyright © 2017, Rezo Zero
 *
 * @file BlockBuilder.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
class BlockBuilder extends AbstractBlockBuilder {
  constructor(container) {
    super(container, 'BlockBuilder');
  }
  /**
   * Returns an `AbstractBlock` child class instance
   * according to the nodeTypeName or an AbstractBlock as default.
   *
   * Comment out the default case if you don’t want a default block to be instantiated
   * for each block.
   *
   * @param  {String} blockType
   * @return {AbstractBlock}
   */


  async getBlockInstance(blockType) {
    if (this.hasService(blockType)) {
      return this.getService(blockType);
    }

    return null;
  }

}

/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file Dom.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
/**
 * Class that is going to deal with DOM parsing/manipulation.
 */

class Dom extends AbstractService {
  /**
   * Constructor.
   *
   * @param {object} container
   */
  constructor(container) {
    super(container, 'Dom');
    /**
     * Full HTML String of the current page.
     * By default is the innerHTML of the initial loaded page.
     *
     * Each time a new page is loaded, the value is the response of the ajax call.
     *
     * @type {String}
     * @default
     */

    this.currentHTML = document.documentElement.innerHTML;
  }
  /**
   * Parse the responseText obtained from the ajax call.
   *
   * @param  {String} responseText
   * @return {HTMLElement}
   */


  parseResponse(responseText) {
    this.currentHTML = responseText;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = responseText;
    return this.getContainer(wrapper);
  }
  /**
   * Get the main wrapper by the ID `wrapperId`.
   *
   * @return {HTMLElement} element
   */


  getWrapper() {
    const wrapper = document.getElementById(this.getService('Config').wrapperId);

    if (!wrapper) {
      throw new Error('Starting Blocks: Wrapper not found!');
    }

    return wrapper;
  }
  /**
   * Return node type.
   *
   * @param container
   * @returns {string}
   */


  getNodeType(container) {
    return container.getAttribute(this.getService('Config').objectTypeAttr);
  }
  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument.
   *
   * @param  {HTMLElement|null} element
   * @return {HTMLElement}
   */


  getContainer(element = null) {
    if (!element) {
      element = document.body;
    }

    if (!element) {
      throw new Error('Starting Blocks: DOM not ready!');
    }

    const container = this.parseContainer(element);

    if (!container) {
      throw new Error(`Starting Blocks: container not found! Did you use at least
            one dom element with ".${this.getService('Config').pageClass}" class and "data-node-type" attribute?`);
    }

    return container;
  }
  /**
   * Put the container on the page.
   *
   * @param  {HTMLElement} element
   */


  putContainer(element) {
    element.style.visibility = 'hidden';
    const wrapper = this.getWrapper();
    wrapper.appendChild(element);
  }
  /**
   * Get container selector.
   *
   * @param  {HTMLElement} element
   * @return {HTMLElement} element
   */


  parseContainer(element) {
    return element.querySelector(`.${this.getService('Config').pageClass}[data-node-type]`);
  }
  /**
   * Update body attributes.
   *
   * @param {AbstractPage} page
   */


  updateBodyAttributes(page) {
    // Change body class and id
    if (page.name) {
      document.body.id = page.name;
      document.body.classList.add(page.name);
    }

    document.body.classList.add(page.type);

    if (page.isHome) {
      document.body.setAttribute('data-is-home', '1');
    } else {
      document.body.setAttribute('data-is-home', '0');
    }
  }
  /**
   * Update page title.
   *
   * @param {AbstractPage} page
   */


  updatePageTitle(page) {
    if (page.metaTitle) {
      document.title = page.metaTitle;
    }
  }

}

// import work from 'webworkify-webpack'

/**
 * Utils class
 */
class Utils {
  /**
   * @param  {String} str
   * @return {String}
   */
  static stripTrailingSlash(str) {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }

    return str;
  }
  /**
   * Get port
   *
   * @param p
   * @returns {*}
   */


  static getPort(p) {
    const port = typeof p !== 'undefined' ? p : window.location.port;
    const protocol = window.location.protocol;

    if (port !== '') {
      return parseInt(port);
    }

    if (protocol === 'http:') {
      return 80;
    }

    if (protocol === 'https:') {
      return 443;
    }
  }

  static cleanLink(url) {
    return url.replace(/#.*/, '');
  }
  /**
   * Get current url
   *
   * @returns {string}
   */


  static getCurrentUrl() {
    return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
  }
  /**
   * Request timeout (in ms)
   *
   * @returns {number}
   */


  static requestTimeout() {
    return 10000;
  }
  /**
   * Start a fetch request
   *
   * @param {String} url
   * @param {Worker|null} worker
   * @return {Promise}
   */


  static request(url, worker) {
    const dfd = Utils.deferred();
    const timeout = window.setTimeout(() => {
      window.clearTimeout(timeout);
      dfd.reject('timeout!');
    }, Utils.requestTimeout());

    if (window.Worker && worker) ; else {
      const headers = new window.Headers();
      headers.append('X-Starting-Blocks', 'yes');
      headers.append('X-Allow-Partial', 'yes');
      headers.append('X-Requested-With', 'XMLHttpRequest');
      window.fetch(url, {
        method: 'GET',
        headers: headers,
        cache: 'default',
        credentials: 'same-origin'
      }).then(res => {
        window.clearTimeout(timeout);

        if (res.status >= 200 && res.status < 300) {
          return dfd.resolve(res.text());
        }

        const err = new Error(res.statusText || res.status);
        return dfd.reject(err);
      }).catch(err => {
        window.clearTimeout(timeout);
        dfd.reject(err);
      });
    }

    return dfd.promise;
  }
  /**
   * Log credits to console for code lovers.
   *
   * @param  {String} siteName
   * @param  {String} bgColor
   * @param  {Array}  creditsList
   * @param  {Array}  thanksList
   * @param  {String} textColor (optional)
   */


  static logCredits(siteName, bgColor, creditsList, thanksList, textColor) {
    let color = '#fff';
    if (typeof textColor !== 'undefined') color = textColor;
    console.log('%c   ', 'font-size:3px;');
    console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;');
    console.log('%c   ', 'font-size:3px;');

    if (creditsList !== null) {
      let creditsLength = creditsList.length;

      if (creditsLength) {
        for (let indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
          console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website);
        }
      }
    }

    if (thanksList !== null) {
      let thanksLength = thanksList.length;

      if (thanksLength) {
        console.log('-');
        console.log('Thanks to');

        for (let indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
          console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')');
        }
      }
    }

    console.log('-');
    console.log(' ');
  }
  /**
   * Get random number.
   *
   * @param  {Number} min [min value]
   * @param  {Number} max [max value]
   * @param  {Number} decimal
   * @return {Number}
   */


  static getRandomNumber(min, max, decimal) {
    const result = Math.random() * (max - min) + min;

    if (typeof decimal !== 'undefined') {
      return Number(result.toFixed(decimal));
    } else return result;
  }
  /**
   * Get random integer.
   *
   * @param  {Number} min [min value]
   * @param  {Number} max [max value]
   * @return {Number}
   */


  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
   * Send a GA page view event when context is AJAX.
   */


  static trackGoogleAnalytics() {
    if (typeof window.ga !== 'undefined') {
      console.debug('🚩 Push Analytics for: ' + window.location.pathname);
      window.ga('send', 'pageview', {
        'page': window.location.pathname,
        'title': document.title
      });
    }
  }
  /**
   * Match CSS media queries and JavaScript window width.
   *
   * @see http://stackoverflow.com/a/11310353
   * @return {Object}
   */


  static getViewportSize() {
    let e = window;
    let a = 'inner';

    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }

    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
  }
  /**
   * Get a css property with the vendor prefix.
   *
   * @param  {String} property the css property
   * @return {String}          the prefixed property
   */


  static prefixProperty(property) {
    const prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
    const numPrefixes = prefixes.length;
    const tmp = document.createElement('div');

    for (let i = 0; i < numPrefixes; i++) {
      let prefix = prefixes[i];
      property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
      const prop = prefix + property;

      if (typeof tmp.style[prop] !== 'undefined') {
        return prop;
      }
    }
  }
  /**
   * Gets normalized ratio of value inside range.
   *
   * from https://github.com/mout/mout/blob/master/src/math/norm.js
   *
   * @param  {Number} val
   * @param  {Number} min
   * @param  {Number} max
   * @return {Number}
   */


  static getNormRatio(val, min, max) {
    if (val < min) return 0;
    if (val > max) return 1;
    return val === max ? 1 : (val - min) / (max - min);
  }
  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @return {Deferred}
   */


  static deferred() {
    return new function () {
      this.resolve = null;
      this.reject = null;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }();
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractTransition.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */
/**
 * Base class for creating transition.
 *
 * @abstract
 */

class AbstractTransition {
  /**
   * Constructor.
   * Do not override this method.
   *
   * @constructor
   */
  constructor() {
    /**
     * @type {AbstractPage|null} old Page instance
     */
    this.oldPage = null;
    /**
     * @type {AbstractPage|null}
     */

    this.newPage = null;
    /**
     * @type {Promise|null}
     */

    this.newPageLoading = null;
  }
  /**
   * Initialize transition.
   * Do not override this method.
   *
   * @param {AbstractPage} oldPage
   * @param {Promise} newPagePromise
   * @returns {Promise}
   */


  init(oldPage, newPagePromise) {
    this.oldPage = oldPage;
    this._newPagePromise = newPagePromise;
    this.deferred = Utils.deferred();
    this.newPageReady = Utils.deferred();
    this.newPageLoading = this.newPageReady.promise;
    this.start();

    this._newPagePromise.then(newPage => {
      this.newPage = newPage;
      this.newPageReady.resolve();
    });

    return this.deferred.promise;
  }
  /**
   * Call this function when the Transition is finished.
   */


  done() {
    this.oldPage.destroy();
    this.newPage.rootElement.style.visibility = 'visible';
    this.newPage.updateLazyload();
    this.deferred.resolve();
  }
  /**
   * Entry point to create a custom Transition.
   * @abstract
   */


  start() {}

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file DefaultTransition.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */
/**
 * Default Transition. Show / Hide content.
 *
 * @extends {AbstractTransition}
 */

class DefaultTransition extends AbstractTransition {
  start() {
    Promise.all([this.newPageLoading]).then(this.finish.bind(this));
  }

  finish() {
    document.body.scrollTop = 0;
    this.done();
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file TransitionFactory.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered.
 *
 * The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @see   http://davidwalsh.name/javascript-debounce-function
 * @param {Function} func     [function to debounce]
 * @param {Number} wait       [time to wait]
 * @param {Boolean} immediate []
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    let later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractBlock.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
/**
 * Base class for creating block implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */

class AbstractBlock extends AbstractService {
  /**
   * Abstract block constructor.
   *
   * It‘s better to extend this class by using `init` method instead
   * of extending `constructor`.
   *
   * @param  {Object} container
   *
   * @constructor
   */
  constructor(container) {
    super(container);
    /**
     * Node Type block name type
     *
     * @type {String|null}
     */

    this.type = null;
    /**
     * Current page instance
     *
     * @type {AbstractPage|null}
     */

    this.page = null;
    /**
     * Container
     * Root container HTMLElement for current block.
     *
     * @type {HTMLElement|null}
     */

    this.rootElement = null;
    /**
     * Block id
     *
     * @type {String|null}
     */

    this.id = null;
    /**
     * Node name
     *
     * @type {String}
     */

    this.name = null; // Bind methods

    this.onResize = this.onResize.bind(this);
    this.onResizeDebounce = debounce(this.onResize, 50, false);
  }
  /**
   * Basic members initialization for children classes.
   * Do not search for page blocks here, use `onPageReady` method instead
   *
   * @abstract
   */


  init() {
    console.debug('\t✳️ #' + this.id + ' %c[' + this.type + ']', 'color:grey');
  }
  /**
   * Bind load and resize events for this specific block.
   *
   * Do not forget to call `super.initEvents();` while extending this method.
   *
   * @abstract
   */


  initEvents() {
    window.addEventListener('resize', this.onResizeDebounce);
  }
  /**
   * Destroy current block.
   *
   * Do not forget to call `super.destroy();` while extending this method.
   */


  destroy() {
    console.debug('\t🗑️ #' + this.id + ' %c[' + this.type + ']', 'color:grey');
    this.destroyEvents();
  }
  /**
   * Unbind event block events.
   *
   * Make sure you’ve used binded methods to be able to
   * `off` them correctly.
   *
   * Do not forget to call `super.destroyEvents();` while extending this method.
   *
   * @abstract
   */


  destroyEvents() {
    window.removeEventListener('resize', this.onResizeDebounce);
  }
  /**
   * Called on window resize
   *
   * @abstract
   */


  onResize() {}
  /**
   * Called once all page blocks have been created.
   *
   * @abstract
   */


  onPageReady() {}

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractPage.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
/**
 * Base class for creating page implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */

class AbstractPage extends AbstractService {
  /**
   * Base constructor for Pages.
   * @constructor
   */
  constructor(container) {
    super(container, 'AbstractPage');
    /**
     * Container element
     *
     * @type {HTMLElement}
     */

    this.rootElement = null;
    /**
     * Page id
     *
     * @type {String|null}
     */

    this.id = null;
    /**
     * Page context (static or ajax)
     *
     * @type {String|null}
     */

    this.context = null;
    /**
     * Page type
     *
     * @type {String|null}
     */

    this.type = null;
    /**
     * Is home ?
     *
     * @type {boolean}
     */

    this.isHome = null;
    /**
     * AbstractBlock collection.
     *
     * @type {Array<AbstractBlock>}
     */

    this.blocks = [];
    /**
     * Node name
     *
     * @type {String|null}
     */

    this.name = null;
    /**
     * Meta title
     * @type {String|null}
     */

    this.metaTitle = null; // Bind methods

    this.onResize = this.onResize.bind(this);
    this.onResizeDebounce = debounce(this.onResize, 50, false);
    this.bindedUpdateBlocks = debounce(this.updateBlocks.bind(this), 50, false);
    this.onLazyImageSet = this.onLazyImageSet.bind(this);
    this.onLazyImageLoad = this.onLazyImageLoad.bind(this);
    this.onLazyImageProcessed = this.onLazyImageProcessed.bind(this);
  }
  /**
   * Initialize page.
   *
   * You should always extends this method in your child implementations instead
   * of extending page constructor.
   */


  async init() {
    // Debug
    console.debug('✳️ #' + this.id + ' %c[' + this.type + '] [' + this.context + ']', 'color:grey');
    /**
     * HTMLElement blocks collection.
     *
     * @type {Array}
     */

    this.blockElements = [...this.rootElement.querySelectorAll(`.${this.getService('Config').pageBlockClass}`)];
    /**
     * @type {Number}
     */

    this.blockLength = this.blockElements.length;

    if (this.blockLength) {
      await this.initBlocks();
    } // Context


    if (this.getService('Config').ajaxEnabled && this.context === 'ajax') {
      this.initAjax();
    } // Lazyload


    if (this.getService('Config').lazyloadEnabled) {
      this.initLazyload();
    }

    this.initEvents();
  }
  /**
   * Destroy current page and all its blocks.
   */


  destroy() {
    console.debug('🗑️ #' + this.id + ' %c[' + this.type + ']', 'color:grey');
    this.rootElement.parentNode.removeChild(this.rootElement);
    this.destroyEvents(); // Do not remove name class on body if destroyed page is the same as current one.

    if (this.getService('PageBuilder').page !== null && this.getService('PageBuilder').page.name !== this.name) {
      document.body.classList.remove(this.name);
    } // Do not remove type class on body if destroyed page is the same as current one.


    if (this.getService('PageBuilder').page !== null && this.getService('PageBuilder').page.type !== this.type) {
      document.body.classList.remove(this.type);
    } // Blocks


    if (this.blocks !== null) {
      for (let blockIndex in this.blocks) {
        if (this.blocks.hasOwnProperty(blockIndex)) {
          this.blocks[blockIndex].destroy();
        }
      }
    } // Remove Lazyload instance and listeners
    // if (this.lazyload !== null) {
    //     this.lazyload.destroy()
    //     this.lazyload = null
    // }

  }
  /**
   * Initialize basic events.
   */


  initEvents() {
    window.addEventListener('resize', this.onResizeDebounce);
    this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks);
    this.domObserver.observe(this.rootElement, {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true
    });
  }
  /**
   * Destroy events
   */


  destroyEvents() {
    window.removeEventListener('resize', this.onResizeDebounce);
    this.domObserver.disconnect();
  }
  /**
   * Init lazyload
   *
   * @private
   */


  initLazyload() {
    this.beforeLazyload(); // this.lazyload = new Lazyload({
    //     threshold: this.pageBuilder.options.lazyloadThreshold,
    //     throttle: this.pageBuilder.options.lazyloadThrottle,
    //     elements_selector: '.' + this.pageBuilder.options.lazyloadClass,
    //     data_src: this.pageBuilder.options.lazyloadSrcAttr.replace('data-', ''),
    //     data_srcset: this.pageBuilder.options.lazyloadSrcSetAttr.replace('data-', ''),
    //     callback_set: this.onLazyImageSet,
    //     callback_load: this.onLazyImageLoad,
    //     callback_processed: this.onLazyImageProcessed
    // })
  }

  updateLazyload() {} // if (this.lazyload) {
  //     this.lazyload.update()
  // }

  /**
   * @param {Function} onShow
   */


  show(onShow) {
    console.debug('▶️ #' + this.id);
    this.rootElement.style.opacity = '1';
    if (typeof onShow !== 'undefined') onShow();
    this.rootElement.classList.remove(this.getService('Config').pageClass + '-transitioning');
    Dispatcher.commit(AFTER_PAGE_SHOW, this);
  }
  /**
   * @param {Function} onHidden
   */


  hide(onHidden) {
    Dispatcher.commit(BEFORE_PAGE_HIDE, this);
    console.debug('◀️ #' + this.id);
    this.rootElement.style.opacity = '0';
    if (typeof onHidden !== 'undefined') onHidden();
    Dispatcher.commit(AFTER_PAGE_HIDE, this);
  }

  initAjax() {
    this.rootElement.classList.add(this.getService('Config').pageClass + '-transitioning');
  }
  /**
   * Initialize page blocks on page.
   */


  async initBlocks() {
    for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
      /**
       * New Block.
       *
       * @type {AbstractBlock}
       */
      let block = await this.initSingleBlock(this.blockElements[blockIndex]); // Prevent undefined blocks to be appended to block collection.

      if (block) {
        this.blocks.push(block);
      }
    } // Notify all blocks that page init is over.


    for (let i = this.blocks.length - 1; i >= 0; i--) {
      if (typeof this.blocks[i].onPageReady === 'function') this.blocks[i].onPageReady();
    }
  }
  /**
   * Append new blocks which were not present at init.
   */


  async updateBlocks() {
    console.debug('\t📯 Page DOM changed…'); // Update lazy load if init.

    this.updateLazyload(); // Create new blocks

    this.blockElements = this.rootElement.querySelectorAll(`.${this.getService('Config').pageBlockClass}`);
    this.blockLength = this.blockElements.length;

    for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
      let blockElement = this.blockElements[blockIndex];

      if (!this.getBlockById(blockElement.id)) {
        try {
          let block = await this.initSingleBlock(this.blockElements[blockIndex]);

          if (block) {
            this.blocks.push(block);
            block.onPageReady();
          }
        } catch (e) {
          console.info(e.message);
        }
      }
    }
  }
  /**
   * @param {HTMLElement} blockElement
   * @return {AbstractBlock}
   */


  async initSingleBlock(blockElement) {
    let blockType = blockElement.getAttribute(this.getService('Config').objectTypeAttr);
    let blockInstance = await this.getService('BlockBuilder').getBlockInstance(blockType);

    if (!blockInstance) {
      return null;
    } // Set values


    blockInstance.type = blockType;
    blockInstance.page = this;
    blockInstance.rootElement = blockElement;
    blockInstance.id = blockElement.id;
    blockInstance.name = blockElement.hasAttribute('data-node-name') ? blockElement.getAttribute('data-node-name') : ''; // Init everything

    blockInstance.init();
    blockInstance.initEvents();
    return blockInstance;
  }
  /**
   * Get a page block instance from its `id`.
   *
   * @param  {String} id
   * @return {AbstractBlock|null}
   */


  getBlockById(id) {
    const index = this.getBlockIndexById(id);

    if (this.blocks[index]) {
      return this.blocks[index];
    }

    return null;
  }
  /**
   * Get a page block index from its `id`.
   *
   * @param  {String} id
   * @return {*|null}
   */


  getBlockIndexById(id) {
    for (let i in this.blocks) {
      if (this.blocks.hasOwnProperty(i)) {
        if (this.blocks[i] && this.blocks[i].id && this.blocks[i].id === id) {
          return i;
        }
      }
    }

    return null;
  }
  /**
   * Get the first page block instance from its `type`.
   *
   * @param  {String} type
   * @return {AbstractBlock|null}
   */


  getFirstBlockByType(type) {
    const index = this.getFirstBlockIndexByType(type);

    if (this.blocks[index]) {
      return this.blocks[index];
    }

    return null;
  }
  /**
   * Get the first page block index from its `type`.
   *
   * @param  {String} type
   * @return {*|null}
   */


  getFirstBlockIndexByType(type) {
    for (let i in this.blocks) {
      if (this.blocks.hasOwnProperty(i)) {
        if (this.blocks[i] && this.blocks[i].type && this.blocks[i].type === type) {
          return i;
        }
      }
    }

    return null;
  }
  /**
   * @abstract
   */


  onResize() {}
  /**
   * Called before init lazyload images.
   */


  beforeLazyload() {}
  /**
   * After image src switched.
   *
   * @abstract
   * @param {HTMLImageElement} element
   */


  onLazyImageSet(element) {
    console.debug('\t🖼 «' + element.id + '» set');
  }
  /**
   * After lazyload image loaded.
   *
   * @abstract
   * @param {HTMLImageElement} element
   */


  onLazyImageLoad(element) {
    console.debug('\t🖼 «' + element.id + '» load');
  }
  /**
   * Before lazyload.
   *
   * @abstract
   */


  onLazyImageProcessed(index) {
    console.debug('\t🖼 Lazy load processed');
  }

}

/**
 * @namespace
 * @type {Object} defaults                      - Default config
 * @property {String} defaults.wrapperId        - Id of the main wrapper
 * @property {String} defaults.pageBlockClass
 * @property {String} defaults.pageClass        - Class name used to identify the containers
 * @property {String} defaults.objectTypeAttr   - The data attribute name to find the node type
 * @property {String} defaults.noAjaxLinkClass
 * @property {String} defaults.noPrefetchClass  - Class name used to ignore prefetch on links.
 * @const
 * @default
 */

const CONFIG = {
  defaults: {
    wrapperId: 'sb-wrapper',
    pageBlockClass: 'page-block',
    pageClass: 'page-content',
    objectTypeAttr: 'data-node-type',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchClass: 'no-prefetch'
  }
};
class StartingBlocks {
  constructor(config = {}) {
    this.bottle = new bottle();
    this.bootables = [];
    this.bottle.value('Config', objectSpread({}, CONFIG.defaults, config));
    this.provider('Dom', Dom);
    this.provider('BlockBuilder', BlockBuilder);
    this.instanceFactory('AbstractPage', c => {
      return new AbstractPage(c);
    });
    this.bootableProvider('PageBuilder', PageBuilder);
  }

  provider(id, ClassName, ...args) {
    if (!id || !ClassName) {
      throw new Error('A parameter is missing');
    }

    this.bottle.provider(id, function () {
      this.$get = container => {
        return new ClassName(container, ...args);
      };
    });
  }

  factory(id, f) {
    this.bottle.factory(id, f);
  }

  instanceFactory(id, f) {
    this.bottle.instanceFactory(id, f);
  }

  bootableProvider(id, ClassName, ...args) {
    this.provider(id, ClassName, ...args);
    this.bootables.push(id);
  }

  boot() {
    for (const serviceName of this.bootables) {
      if (this.bottle.container.hasOwnProperty(serviceName)) {
        this.bottle.container[serviceName].boot();
      }
    }
  }

}

/**
 * Copyright © 2017, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Pjax.js
 * @author Adrien Scholaert
 */
/**
 * Pjax.
 */

class Pjax extends AbstractBootableService {
  constructor(container) {
    super(container, 'Pjax', ['Dom', 'Config', 'History', 'PageBuilder', 'TransitionFactory']);
    /**
     * Indicate if there is an animation in progress.
     *
     * @readOnly
     * @type {Boolean}
     */

    this.transitionProgress = false; // Bind methods

    this.onNewPageLoaded = this.onNewPageLoaded.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }
  /**
   * Init the events.
   *
   * @private
   */


  boot() {
    super.boot();
    const wrapper = this.getService('Dom').getWrapper();
    wrapper.setAttribute('aria-live', 'polite');
    this.currentState = this.getService('History').add(this.getCurrentUrl(), null, 'static');
    this.bindEvents();
  }
  /**
   * Attach event listeners.
   *
   * @private
   */


  bindEvents() {
    document.addEventListener('click', this.onLinkClick);
    window.addEventListener('popstate', this.onStateChange);
  }
  /**
   * Return the currentURL cleaned.
   *
   * @return {String} currentUrl
   */


  getCurrentUrl() {
    // TODO, clean from what? currenturl do not takes hash..
    return Utils.cleanLink(Utils.getCurrentUrl());
  }
  /**
   * Change the URL with push state and trigger the state change.
   *
   * @param {String} url
   * @param {String} transitionName
   */


  goTo(url, transitionName) {
    const currentPosition = window.scrollY;
    window.history.pushState(null, null, url);
    window.scrollTo(0, currentPosition);
    this.onStateChange(transitionName, true);
  }
  /**
   * Force the browser to go to a certain url.
   *
   * @param {String} url
   * @private
   */


  forceGoTo(url) {
    window.location = url;
  }
  /**
   * Load an url, will start an ajax request or load from the cache.
   *
   * @private
   * @param  {String} url
   * @return {Promise}
   */


  load(url) {
    const deferred = Utils.deferred(); // Show loader

    if (this.hasService('GraphicLoader')) {
      this.getService('GraphicLoader').show();
    } // Check cache


    let request = null;

    if (this.hasService('CacheProvider')) {
      request = this.getService('CacheProvider').get(url);
    } // If no cache, make request


    if (!request) {
      let serviceWorker = null;

      if (this.hasService('Worker')) {
        serviceWorker = this.getService('Worker');
      }

      request = Utils.request(url, serviceWorker); // If cache provider, cache the request

      if (this.hasService('CacheProvider')) {
        this.getService('CacheProvider').set(url, request);
      }
    } // When data are loaded


    request.then(data => {
      const container = this.getService('Dom').parseResponse(data); // Dispatch an event

      Dispatcher.commit(AFTER_PAGE_LOAD, {
        container,
        currentHTML: this.getService('Dom').currentHTML
      }); // Add new container to the DOM

      this.getService('Dom').putContainer(container); // Dispatch an event

      Dispatcher.commit(AFTER_DOM_APPENDED, {
        container,
        currentHTML: this.getService('Dom').currentHTML
      }); // Build page

      const page = this.getService('PageBuilder').buildPage(container);
      deferred.resolve(page);
    }).catch(err => {
      console.error(err);
      this.forceGoTo(url);
      deferred.reject();
    });
    return deferred.promise;
  }
  /**
   * Get the .href parameter out of a link element
   *
   * @private
   * @param  {HTMLElement} el
   * @return {String|undefined} href
   */


  getHref(el) {
    if (!el) {
      return undefined;
    } // Check if has a href and if it's a link element


    if (typeof el.href === 'string' && el.tagName.toUpperCase() === 'A') {
      return el.href;
    }

    return undefined;
  }
  /**
   * Get transition name from HTMLElement attribute (data-transition).
   *
   * @param {HTMLElement} el
   * @returns {String|undefined} The transition name
   */


  getTransitionName(el) {
    if (!el) {
      return null;
    }

    if (el.getAttribute && typeof el.getAttribute('data-transition') === 'string') {
      return el.getAttribute('data-transition');
    }

    return null;
  }
  /**
   * Callback called from click event.
   *
   * @private
   * @param {MouseEvent} evt
   */


  onLinkClick(evt) {
    /**
     * @type {HTMLElement|Node|EventTarget}
     */
    let el = evt.target; // Go up in the node list until we
    // find something with an href

    while (el && !this.getHref(el)) {
      el = el.parentNode;
    }

    if (this.preventCheck(evt, el)) {
      evt.preventDefault();
      this.linkHash = el.hash.split('#')[1];
      const href = this.getHref(el);
      const transitionName = this.getTransitionName(el);
      this.goTo(href, transitionName);
    }
  }
  /**
   * Determine if the link should be followed.
   *
   * @param  {MouseEvent} evt
   * @param  {HTMLElement} element
   * @return {Boolean}
   */


  preventCheck(evt, element) {
    if (!window.history.pushState) {
      return false;
    }

    const href = this.getHref(element); // User

    if (!element || !href) {
      return false;
    } // Middle click, cmd click, and ctrl click


    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
      return false;
    } // Ignore target with _blank target


    if (element.target && element.target === '_blank') {
      return false;
    } // Check if it's the same domain


    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
      return false;
    } // Check if the port is the same


    if (Utils.getPort() !== Utils.getPort(element.port)) {
      return false;
    } // Ignore case when a hash is being tacked on the current URL
    // if (href.indexOf('#') > -1)
    //   return false;
    // Ignore case where there is download attribute


    if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
      return false;
    } // In case you're trying to load the same page


    if (Utils.cleanLink(href) === Utils.cleanLink(window.location.href)) {
      return false;
    }

    return !element.classList.contains(this.getService('Config').noAjaxLinkClass);
  }
  /**
   * Return a transition object.
   *
   * @param  {object} prev historyManager
   * @param  {object} current historyManager
   * @return {AbstractTransition} Transition object
   */


  getTransition(prev, current) {
    return this.getService('TransitionFactory').getTransition(prev, current);
  }
  /**
   * Method called after a 'popstate' or from .goTo().
   *
   * @private
   */


  onStateChange(transitionName = null, isAjax = false) {
    const newUrl = this.getCurrentUrl();

    if (this.transitionProgress) {
      this.forceGoTo(newUrl);
    }

    if (this.getService('History').currentStatus().url === newUrl) {
      return false;
    } // If transition name is a string, a link have been click
    // Otherwise back/forward buttons have been pressed


    if (typeof transitionName === 'string' || isAjax) {
      this.currentState = this.getService('History').add(newUrl, transitionName, 'ajax');
    } else {
      this.currentState = this.getService('History').add(newUrl, null, '_history');
    } // Dispatch an event to inform that the page is being load


    Dispatcher.commit(BEFORE_PAGE_LOAD, {
      currentStatus: this.getService('History').currentStatus(),
      prevStatus: this.getService('History').prevStatus()
    }); // Load the page with the new url (promise is return)

    const newPagePromise = this.load(newUrl); // Get the page transition instance (from prev and current state)

    const transition = this.getTransition(this.getService('History').prevStatus(), this.getService('History').currentStatus());
    this.transitionProgress = true; // Dispatch an event that the transition is started

    Dispatcher.commit(TRANSITION_START, {
      transition: transition,
      currentStatus: this.getService('History').currentStatus(),
      prevStatus: this.getService('History').prevStatus()
    }); // Start the transition (with the current page, and the new page load promise)

    const transitionPromise = transition.init(this.getService('PageBuilder').page, newPagePromise);
    newPagePromise.then(this.onNewPageLoaded);
    transitionPromise.then(this.onTransitionEnd);
  }
  /**
   * Function called as soon the new page is ready.
   *
   * @private
   * @param {AbstractPage} page
   */


  onNewPageLoaded(page) {
    const currentStatus = this.getService('History').currentStatus();

    if (this.hasService('GraphicLoader')) {
      this.getService('GraphicLoader').hide();
    } // Update body attributes (class, id, data-attributes


    this.getService('Dom').updateBodyAttributes(page); // Update the page title

    this.getService('Dom').updatePageTitle(page); // Send google analytic data

    Utils.trackGoogleAnalytics(); // Update the current state

    if (this.currentState && page) {
      if (!this.currentState.data.title && page.metaTitle) {
        this.currentState.data.title = page.metaTitle;
      }
    }

    Dispatcher.commit(CONTAINER_READY, {
      currentStatus,
      prevStatus: this.getService('History').prevStatus(),
      currentHTML: this.getService('Dom').currentHTML,
      page
    });
  }
  /**
   * Function called as soon the transition is finished.
   *
   * @private
   */


  onTransitionEnd() {
    this.transitionProgress = false;

    if (this.linkHash) {
      window.location.hash = '';
      window.location.hash = this.linkHash;
      this.linkHash = null;
    }

    Dispatcher.commit(TRANSITION_COMPLETE, {
      currentStatus: this.getService('History').currentStatus(),
      prevStatus: this.getService('History').prevStatus()
    });
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file History.js
 * @author Adrien Scholaert
 */
/**
 * HistoryManager helps to keep track of the navigation.
 *
 * @type {Object}
 */

class History extends AbstractService {
  constructor(container) {
    super(container, 'History');
    /**
     * Keep track of the status in historic order.
     *
     * @readOnly
     * @type {Array}
     */

    this.history = [];
  }
  /**
   * Add a new set of url and namespace.
   *
   * @param {String} url
   * @param {String} transitionName
   * @param {String} context (ajax, history)
   * @param {Object} data (optional data)
   *
   * @return {Object}
   */


  add(url, transitionName, context, data = {}) {
    const state = {
      url,
      transitionName,
      context,
      data
    };
    this.history.push(state);
    return state;
  }
  /**
   * Return information about the current status.
   *
   * @return {Object}
   */


  currentStatus() {
    return this.history[this.history.length - 1];
  }
  /**
   * Return information about the previous status.
   *
   * @return {Object}
   */


  prevStatus() {
    const history = this.history;

    if (history.length < 2) {
      return null;
    }

    return history[history.length - 2];
  }

}

/**
 * Copyright © 2017, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Prefetch.js
 * @author Adrien Scholaert
 */
/**
 * Prefetch.
 *
 * @type {Object}
 */

class Prefetch extends AbstractBootableService {
  constructor(container) {
    super(container, 'Prefetch', ['Pjax', 'Config']);
  }

  boot() {
    super.boot();

    if (!window.history.pushState) {
      return false;
    }

    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
  }

  onLinkEnter(evt) {
    let el = evt.target;

    while (el && !this.getService('Pjax').getHref(el)) {
      el = el.parentNode;
    }

    if (!el || el.classList.contains(this.getService('Config').noPrefetchClass)) {
      return;
    }

    let url = this.getService('Pjax').getHref(el); // Check if the link is eligible for Pjax

    if (this.getService('Pjax').preventCheck(evt, el)) {
      if (this.hasService('CacheProvider') && this.getService('CacheProvider').get(url)) {
        return;
      }

      let serviceWorker = null;

      if (this.hasService('Worker')) {
        serviceWorker = this.getService('Worker');
      }

      let xhr = Utils.request(url, serviceWorker);

      if (this.hasService('CacheProvider')) {
        this.getService('CacheProvider').set(url, xhr);
      }
    }
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file CacheProvider.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
/**
 * Cache provider class.
 *
 * This class stores Ajax response in memory.
 */

class CacheProvider extends AbstractService {
  constructor(container) {
    super(container, 'CacheProvider');
    this.data = {};
  }
  /**
   * @param  {String} key
   * @return {Boolean}
   */


  exists(key) {
    return key in this.data;
  }
  /**
   * @param  {String} href
   * @return {Object}
   */


  get(href) {
    return this.data[href];
  }
  /**
   * @param  {String} key
   * @param  {Object} data
   * @return {CacheProvider}  this
   */


  set(key, data) {
    this.data[key] = data;
    return this;
  }
  /**
   * Flush the cache
   */


  reset() {
    this.data = {};
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file GraphicLoader.js
 * @author Ambroise Maupate
 */

/**
 * Handle your application main loader animation.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 */
class GraphicLoader {
  /**
   * Interface for a graphic loader element.
   *
   * Any child implementations must implements
   * show and hide methods.
   *
   * @abstract
   */
  constructor() {
    console.debug('🌀 Construct loader');
  }
  /**
   * Show loader.
   *
   * @abstract
   */


  show() {
    console.debug('🌀 Show loader');
  }
  /**
   * Hide loader.
   *
   * @abstract
   */


  hide() {
    console.debug('🌀 Hide loader');
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Scroll.js
 * @author Ambroise Maupate
 */

/**
 * @static
 */
class Scroll {
  /**
   *
   * @param e
   * @private
   */
  static _preventDefault(e) {
    e = e || window.event;

    if (e.preventDefault) {
      e.preventDefault();
    }

    e.returnValue = false;
  }
  /**
   *
   * @param e
   * @private
   */


  static _keydown(e) {
    // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    let keys = [37, 38, 39, 40, 33, 34, 35];

    for (let i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        Scroll._preventDefault(e);

        return;
      }
    }
  }
  /**
   *
   * @param e
   * @private
   */


  static _wheel(e) {
    Scroll._preventDefault(e);
  }
  /**
   * Disable scroll.
   *
   * @return {void}
   */


  static disable() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', Scroll._wheel, false);
    }

    window.onmousewheel = document.onmousewheel = Scroll._wheel;
    document.onkeydown = Scroll._keydown;
  }
  /**
   * Enable scroll again.
   *
   * @return {void}
   */


  static enable() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', Scroll._wheel, false);
    }

    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }

}

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file polyfills.js
 * @author Ambroise Maupate
 */

/**
 * Execute some polyfill for older and crappy browsers.
 *
 * - window.requestAnimFrame
 * - window.cancelAnimFrame
 * - Avoid `console` errors in browsers that lack a console.
 */
function polyfills() {
  window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
    /* function */
    callback) {
      window.setTimeout(callback, 1000 / 60); // 60fps
    };
  }();

  window.cancelAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
      window.clearTimeout(id);
    };
  }();
  /*
   * Avoid `console` errors in browsers that lack a console.
   * @return {[type]} [description]
   */


  {
    let method;

    const noop = () => {};

    const methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    let length = methods.length;
    const console = window.console = window.console || {};

    while (length--) {
      method = methods[length]; // Only stub undefined methods.

      if (!console[method]) {
        console[method] = noop;
      }
    }
  }
  /**
   * Array.from polyfill
   */

  if (!Array.from) {
    Array.from = function (object) {

      return [].slice.call(object);
    };
  }
  /**
   * Array.find polyfill
   */


  if (!Array.prototype.find) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Array.prototype, 'find', {
      value: function value(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        let list = Object(this);
        let length = list.length >>> 0;
        let thisArg = arguments[1];
        let value;

        for (let i = 0; i < length; i++) {
          value = list[i];

          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }

        return undefined;
      }
    });
  }
  /**
   * FindIndex polyfill
   */


  if (!Array.prototype.findIndex) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function value(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this === null) {
          throw new TypeError('"this" is null or not defined');
        }

        let o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        let len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


        let thisArg = arguments[1]; // 5. Let k be 0.

        let k = 0; // 6. Repeat, while k < len

        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          let kValue = o[k];

          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          } // e. Increase k by 1.


          k++;
        } // 7. Return -1.


        return -1;
      }
    });
  }
  /**
   * Custom event support for IE
   */


  (function () {
    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      let evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  })();
}

/**
 * Method to track JS errors if your Google Analytics account.
 */
function gaTrackErrors() {
  if (typeof ga !== 'undefined') {
    // Pure JavaScript errors handler
    window.addEventListener('error', function (err) {
      const lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno;
      window.ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent, 0, true);
    });
  }
}

/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file bootstrapMedia.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
/**
 * Static class to get bootstrap breakpoints.
 */

class BootstrapMedia {
  constructor() {
    // Values
    this.viewportSize = null;
    this.breakpoints = {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920 // Binded methods

    };
    this.setValues = this.setValues.bind(this); // Init

    this.init();
  }

  init() {
    window.addEventListener('resize', this.setValues);
    this.setValues();
  }

  setValues() {
    this.viewportSize = Utils.getViewportSize();
  }

  resize() {
    this.setValues();
  }

  isMin(breakpoint) {
    if (!this.breakpoints[breakpoint]) {
      const errorMessage = `Breakpoint '${breakpoint}' do not exist`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return this.viewportSize.width >= this.breakpoints[breakpoint];
  }

}

export default StartingBlocks;
export { EventTypes, PageBuilder, BlockBuilder, Pjax, History, Prefetch, CacheProvider, GraphicLoader, AbstractPage, AbstractBlock, AbstractTransition, AbstractBlockBuilder, AbstractService, DefaultTransition, Utils, Scroll, polyfills, gaTrackErrors, debounce, BootstrapMedia, Dispatcher };
