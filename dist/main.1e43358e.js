// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/main.js":[function(require,module,exports) {
var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import Vue from 'vue';
// import App from './App.vue';
// new Vue({
//   render: h => h(App),
// }).$mount('#app');
var app = new Vue({
  el: '#app',
  data: {
    title: 'Feed my dog Doggo some beef kibbles',
    description: "He needs more protein in Monday",
    due_date: "07-08-20",
    imageUrl: "https://img-9gag-fun.9cache.com/photo/aXj502b_460swp.webp",
    //currently there are 4 categories: "backlog","todo","done","completed"
    isLoggedIn: false,
    isLogInPage: true,
    isMainPage: false,
    isAddTaskPage: false,
    isEditTaskPage: false,
    isRegisterPage: false,
    tasks: [],
    backlogTasks: [],
    todoTasks: [],
    doneTasks: [],
    completedTasks: [],
    newTask: {
      title: "",
      category: "",
      tags: "",
      description: "",
      due_date: ""
    },
    selectedTask: "",
    user: {
      email: "",
      password: "",
      access_token: ""
    },
    registerUser: {
      email: "",
      password: ""
    }
  },
  methods: (_methods = {
    login: function login() {
      var _this = this;

      //create payload -- hit api using axios for registering -- gained token from server
      var payload = {
        email: this.user.email,
        password: this.user.password
      };
      axios.post("http://localhost:3000/login", payload).then(function (result) {
        // console.log(result.data.access_token, "this is token result")
        localStorage.access_token = result.data.access_token; // console.log(localStorage.access_token, "this is token at localStorage")

        _this.user.email = "";
        _this.user.password = "";
        _this.isLoggedIn = true;
        _this.isMainPage = true;

        _this.getTasks();
      }).catch(function (error) {
        console.log(error);
      });
    },
    logout: function logout() {
      localStorage.clear();
      this.isLoggedIn = false;
    },
    getTasks: function getTasks() {
      var _this2 = this;

      axios.get("http://localhost:3000/tasks", {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(function (result) {
        result.data.tasks.map(function (el) {
          var date = new Date(el.due_date);
          el.due_date = date.toDateString();
        });
        console.log("UPDATED ALLDATA", result.data.tasks);
        _this2.tasks = result.data.tasks;

        _this2.reassignTasks();
      }).catch(function (error) {
        console.log(error);
      });
    },
    reassignTasks: function reassignTasks() {
      // console.log("this is classify tasks")
      // console.log(this.tasks)
      this.backlogTasks = [];
      this.todoTasks = [];
      this.doneTasks = [];
      this.completedTasks = [];

      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i]["category"] === "backlog") {
          this.backlogTasks.push(this.tasks[i]);
        } else if (this.tasks[i]["category"] === "todo") {
          this.todoTasks.push(this.tasks[i]);
        } else if (this.tasks[i]["category"] === "done") {
          this.doneTasks.push(this.tasks[i]);
        } else if (this.tasks[i]["category"] === "completed") {
          this.completedTasks.push(this.tasks[i]);
        }
      }
    },
    moveCategory: function moveCategory(taskId, newCategory) {
      var _this3 = this;

      console.log(taskId, "ini task id");
      console.log(newCategory, "ini new category"); // console.log(localStorage.access_token, "+++++++++++")
      // console.log(this.user.access_token, "------------")
      //proses axios di sini untuk patch specific Task -- this.reassignTASKS
      // {{ host  }}/tasks/12/?newCategory=done
      // `http://localhost:3000/tasks/${taskId}/?newCategory=${newCategory}`,

      axios({
        method: 'patch',
        url: "http://localhost:3000/tasks/".concat(taskId, "/?newCategory=").concat(newCategory),
        headers: {
          access_token: localStorage.access_token // make sure to consistently use localStorage.access_token

        }
      }).then(function (result) {
        // console.log(result.data, "result dari patch")
        _this3.getTasks();
      }).catch(function (error) {
        console.log("error at moveCategory caused by", error);
      });
    },
    addNewTask: function addNewTask() {
      this.isAddTaskPage = true;
    },
    deleteTask: function deleteTask(taskId) {
      var _this4 = this;

      console.log(taskId);
      axios({
        method: "delete",
        url: "http://localhost:3000/tasks/".concat(taskId),
        headers: {
          access_token: localStorage.access_token
        }
      }).then(function (result) {
        console.log(result);

        _this4.getTasks();

        _this4.reassignTasks();
      }).catch(function (error) {
        console.log(error);
      });
    },
    showAddTaskPage: function showAddTaskPage() {
      this.isMainPage = false;
      this.isAddTaskPage = true;
    }
  }, _defineProperty(_methods, "addNewTask", function addNewTask() {
    var _this5 = this;

    var title = this.newTask.title;
    var description = this.newTask.description;
    var due_date = this.newTask.due_date;
    var payload = {
      title: title,
      description: description,
      due_date: due_date,
      tags: "",
      category: "backlog"
    };
    axios({
      method: "post",
      url: "http://localhost:3000/tasks",
      headers: {
        access_token: localStorage.access_token // make sure to consistently use localStorage.access_token

      },
      data: payload
    }).then(function (result) {
      _this5.isAddTaskPage = false;
      _this5.isMainPage = true;

      _this5.getTasks();

      _this5.reassignTasks();
    }).catch(function (error) {
      console.log(error);
    });
  }), _defineProperty(_methods, "backToMainPage", function backToMainPage() {
    this.isAddTaskPage = false;
    this.isEditTaskPage = false;
    this.isMainPage = true;
  }), _defineProperty(_methods, "showEditPage", function showEditPage(taskId) {
    var _this6 = this;

    this.isMainPage = false;
    this.isEditTaskPage = true;
    axios({
      method: 'get',
      url: "http://localhost:3000/tasks/".concat(taskId),
      headers: {
        access_token: localStorage.access_token
      }
    }).then(function (result) {
      console.log(result.data.task);
      _this6.selectedTask = "";
      var StringDate = new Date(result.data.task.due_date);
      var displayDate = StringDate.toISOString().substring(0, 10);
      result.data.task.due_date = displayDate;
      _this6.selectedTask = result.data.task;
    }).catch(function (error) {
      console.log(error);
    });
  }), _defineProperty(_methods, "showRegisterPage", function showRegisterPage() {
    this.isMainPage = false;
    this.isRegisterPage = true;
    this.isLogInPage = false;
  }), _defineProperty(_methods, "register", function register() {
    var _this7 = this;

    var payload = {
      email: this.registerUser.email,
      password: this.registerUser.password
    };
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: payload
    }).then(function (_) {
      _this7.isRegisterPage = false;
      _this7.isLogInPage = true;
    }).catch(function (error) {
      console.log(error);
    });
  }), _methods),
  //Vue lifecycle starts here
  beforeCreate: function beforeCreate() {},
  created: function created() {
    if (localStorage.access_token) {
      this.isLoggedIn = true;
      this.isMainPage = true;
      this.getTasks();
    }
  },
  beforeMounted: function beforeMounted() {},
  mounted: function mounted() {},
  beforeUpdated: function beforeUpdated() {},
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
});
},{}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62125" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map