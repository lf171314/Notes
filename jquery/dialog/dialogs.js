/**
 * 对话框 dialog 脚本
 * 主要实现了 alert confirm msg 三个对话框
 *
 * @author lf
 * @version 1.0.5
 * @param {object} config dialog 参数配置
 * @return {object} dialog
 */
/**
 *  参数说明
 *  title: {String} dialog 标题, // 默认 ‘提示’
    text: {String} dialog 内容,
    icon: {Number} dialog 图标 0 empty 1 success 2 info 3 warning 4 loading，// 默认 0
    isMask: {Boolean} 是否遮罩 truthy 遮罩 falsy 不遮罩, // 默认 true
    time: {Number} msg弹窗消失时间 单位ms 默认 2000

    closeable: {Boolean} 点击遮罩是否关闭dialog  truthy 是 falsy 否, // 默认 true
    ok: {Function} 成功回调,
    cancel: {Function} 取消回调,
    cancelText: {String} 取消按钮文本, // 默认 ‘取消’
    okText: {String} 成功按钮文本, // 默认 ‘确认’
    cancelUrl: {String} 取消跳转链接,
    okUrl: {String} 成功跳转链接,
    mounted: {Function} DOM 插入 HTML 后执行的回调函数,

    className: {String} dialog 自定义 class,
    wrapClass: {String} dialog 外层自定义 class,
    headerTemp: {String} dialog 头部自定义模板, 传null为空模板
    bodyTemp: {String} dialog 内容自定义模板, 传null为空模板
    footerTemp: {String} dialog 底部自定义模板, 传null为空模板
    container: {String} loading 容器 id 或者 className， 默认 'body', 目前仅 loading 使用
 */
/**
 * @description model 对话框
 * @example
 * dialog.model({
 *  text: '请登录'
 * })
 */
/**
 * @description alert 对话框
 * @example
 * dialog.alert({
 *  text: "请登录"
 * })
 */
/**
 * @description confirm 对话框
 * @example
 * dialog.confirm({
 *  text: '去认证'
 * })
 */
/* dialog template
<div class="dialog-wrapper dialog-mask">
    <div class="dialog-block_layout dialog">
      <div class="dialog-header">
        <h3 class="dialog-title text-center">提示</h3>
        <i class="icon-close"></i>
      </div>
      <div class="dialog-body text-center">
        <span class="dialog-icon"></span>
        <p>确定</p>
      </div>
      <div class="dialog-footer text-center">
        <a href="javascript:;" class="dialog-cancel dialog-btn">取消</a>
        <a href="javascript:;" class="dialog-ok dialog-btn">确定</a>
      </div>
    </div>
  </div>
*/
/**
 * example  // 目前只有一个icon需要
 * <div class="dialog-msg">
 *    <div class="dialog-icon"></div>
 *    <p>文本</p>
 * </div>
 */
; (function ($) {
  function Dialogs() {
    this.options = {
      container: 'body',
      title: "提示",
      text: "",
      icon: 0, // 0 empty 1 success 2 info 3 warning 4 danger// 未完全实现
      className: '',
      wrapClass: '',
      headerTemp: '',
      bodyTemp: '',
      footerTemp: '',
      loadingTemp: '<div class="dialog-wrapper dialog-loading_wrapper"></div>',
      isMask: true,
      closeable: true,
      ok: null,
      cancel: null,
      okUrl: '',
      cancelUrl: '',
      cancelText: '取消',
      okText: '确定',
      mounted: null,
      time: 2000,
    };

    return this;
  }

  Dialogs.prototype = {
    noop: function () { },
    render: function (config) {
      this.config = $.extend({}, this.options, config || {});
      var compile;
      var wrapper = document.createElement('div');
      var dialog = document.createElement('div');
      var oFragment = document.createDocumentFragment();

      compile = config.headerTemp + config.bodyTemp + config.footerTemp;

      wrapper.className = 'dialog-wrapper';
      dialog.className = 'dialog-block_layout dialog';

      if (config.isMask) {
        wrapper.className += ' dialog-mask'
      }

      if (config.wrapClass) {
        wrapper.className += " " + config.wrapClass
      }

      if (config.className) {
        dialog.className += " " + config.className
      }
      // dialog 增加icon
      switch (+config.icon) {
        case 1:
          dialog.className += ' dialog-success';
          break;
        case 2:
          dialog.className += ' dialog-info';
          break;
        case 3:
          dialog.className += ' dialog-warning';
          break;
        case 4:
          dialog.className += ' dialog-danger';
          break;
        default:
          dialog.className += ' dialog-default';
          break;
      }

      $(dialog).html(compile);
      $(wrapper).append(dialog);
      $(oFragment).append(wrapper);

      document.body.appendChild(oFragment);

      this.ok().close();
      (this.config.mounted || this.noop)();

      return this;
    },
    model: function (config) {
      var conf = $.extend({}, this.options, config || {});

      var iconTemp = '';

      if (conf.icon) {
        iconTemp = '<span class="dialog-icon"></span>'
      }

      if (config.headerTemp !== null) {
        conf.headerTemp = config.headerTemp || ('<div class="dialog-header">'
          + iconTemp
          + '<h3 class="dialog-title text-center">'
          + conf.title
          + '</h3><i class="dialog-close"></i></div>');
      }
      if (conf.bodyTemp !== null) {
        conf.bodyTemp = conf.bodyTemp || ('<div class="dialog-body dialog-base text-center"><p>'
          + conf.text
          + '</p></div>');
      }
      this.render(conf);
    },
    alert: function (config) {
      var conf = $.extend({}, this.options, config || {});

      var iconTemp = '';

      if (conf.icon) {
        iconTemp = '<span class="dialog-icon"></span>'
      }

      if (conf.headerTemp !== null) {
        conf.headerTemp = config.headerTemp || ('<div class="dialog-header">'
          + iconTemp
          + '<h3 class="dialog-title text-center">'
          + conf.title
          + '</h3><i class="dialog-close"></i></div>');
      }
      if (conf.bodyTemp !== null) {
        conf.bodyTemp = conf.bodyTemp || ('<div class="dialog-body text-center"><p>'
          + conf.text
          + '</p></div>');
      }
      if (conf.footerTemp !== null) {
        conf.footerTemp = conf.footerTemp || ('<div class="dialog-footer text-center">'
          + '<a href="' + (conf.okUrl || 'javascript:;')
          + '" class="dialog-btn dialog-ok">'
          + conf.okText + '</a></div>');
      }

      this.render(conf);
    },
    confirm: function (config) {
      var conf = $.extend({}, this.options, config || {});

      var iconTemp = '';

      if (conf.icon) {
        iconTemp = '<span class="dialog-icon"></span>'
      }

      if (conf.headerTemp !== null) {
        conf.headerTemp = config.headerTemp || ('<div class="dialog-header">'
          + iconTemp
          + '<h3 class="dialog-title text-center">'
          + conf.title
          + '</h3><i class="dialog-close"></i></div>');
      }

      if (conf.bodyTemp !== null) {
        conf.bodyTemp = conf.bodyTemp || ('<div class="dialog-body text-center"><p>'
          + conf.text
          + '</p></div>');
      }

      if (conf.footerTemp !== null) {
        conf.footerTemp = conf.footerTemp || ('<div class="dialog-footer text-center">'
          + '<a href="' + (conf.cancelUrl || 'javascript:;')
          + '" class="dialog-cancel dialog-btn">'
          + conf.cancelText + '</a>'
          + '<a href="' + (conf.okUrl || 'javascript:;')
          + '" class="dialog-btn dialog-ok">'
          + conf.okText + '</a></div>');
      }

      this.render(conf).cancel();
    },
    loading: function (config) {
      var obj = {};
      if (typeof config === 'string') {
        obj.container = config;
        var conf = $.extend({}, this.options, obj);
      } else {
        var conf = $.extend({}, this.options, config || {});
      }

      $.each($(conf.container), function (index, item) {
        var $oDiv = $(conf.loadingTemp);

        if (conf.wrapClass) {
          $oDiv.addClass(conf.wrapClass);
        }

        $oDiv.append($('<div class="dialog-loading">'));

        $(item).css('position', 'relative').append($oDiv);
      });

      return this;
    },
    removeLoading: function (config) {
      var obj = {};
      if (typeof config === 'string') {
        obj.container = config;
        var conf = $.extend({}, this.options, obj);
      } else {
        var conf = $.extend({}, this.options, config || {});
      }

      if (conf.wrapClass) {
        $(conf.container).find('.' + conf.wrapClass).remove();
      } else {
        $(conf.container).find('.dialog-loading_wrapper').remove();
      }

      return this;
    },
    msg: function (config) {
      var self = this;
      var conf = $.extend({}, this.options, config || {});

      if (conf.icon) {
        conf.bodyTemp = '<div class="dialog-icon"></div>';
      }

      if (conf.text) {
        conf.bodyTemp += '<p>' + conf.text + '</p>'
      }

      var $oDiv = $("<div class='dialog-msg'></div>").html(conf.bodyTemp);

      // fixed: 42858 增加一层透明遮罩
      var $oWrap = $('<div class="dialog-wrapper dialog-msg_layout"></div>').append($oDiv);

      $('body').append($oWrap);

      if (Math.abs(conf.time) || conf.time === 0) {
        setTimeout(function () {
          $('.dialog-msg_layout').remove();
          (conf.ok || self.noop)()
        }, conf.time);
      }
    },
    close: function () {
      var self = this;

      // 阻止事件冒泡
      $(document).on('click.dialog', '.dialog-block_layout', function (e) {
        e.stopPropagation();
      });

      $(document).on('click.dialog', '.dialog-close', function () {
        (self.config.cancel || self.noop)();
        self.remove();
      });

      if (self.config.isMask && self.config.closeable) {
        $(document).on('click.dialog', '.dialog-wrapper', function () {
          (self.config.cancel || self.noop)();
          self.remove();
        })
      }
    },
    cancel: function () {
      var self = this;

      $(document).on('click.dialog', '.dialog-cancel', function () {
        (self.config.cancel || self.noop)();
        self.remove();
      });

      return self;
    },
    ok: function () {
      var self = this;

      $(document).on('click.dialog', '.dialog-ok', function () {
        (self.config.ok || self.noop)();
        self.remove();
      });

      return self;
    },
    remove: function () {
      $(document).find('.dialog-wrapper').remove();
      // 解除事件委托 => 31308
      $(document).off('click.dialog');
    }
  };

  window.dialog = new Dialogs;

  return dialog
})(jQuery);
