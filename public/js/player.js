// Generated by CoffeeScript 1.8.0
(function() {
  var Player;

  Player = (function() {
    function Player() {
      this.audioPlayers = [];
      this.currentPlaying = null;
      this.isPlaying = false;
      this.currentTrack = 0;
      this.initEvents();
      this;
    }

    Player.prototype.initEvents = function(el) {
      $(this).on('newAudio', (function(_this) {
        return function(e, el) {
          return _this.audioPlayers.push(el);
        };
      })(this));
      $(this).on('playLast', (function(_this) {
        return function(e) {
          return _this.playLast();
        };
      })(this));
      $(this).on('playIndex', (function(_this) {
        return function(e, index) {
          if (_this.currentTrack === index && _this.isPlaying) {
            return _this.pauseCurrent();
          } else {
            _this.currentTrack = index;
            return _this.playCurrent();
          }
        };
      })(this));
      return $(this).on('playAudio', (function(_this) {
        return function(e, audio) {
          var i;
          i = _this.audioPlayers.indexOf(audio);
          if (_this.currentTrack === i && _this.isPlaying) {
            return _this.pauseCurrent();
          } else {
            _this.currentTrack = i;
            return _this.playCurrent();
          }
        };
      })(this));
    };

    Player.prototype.pauseCurrent = function() {
      var audio, current, _fn, _i, _len;
      current = _.filter(this.audioPlayers, function(a) {
        return a.paused === false;
      });
      _fn = function(audio) {
        return audio.pause();
      };
      for (_i = 0, _len = current.length; _i < _len; _i++) {
        audio = current[_i];
        _fn(audio);
      }
      $(Sounder.renderer).trigger('pause');
      return this.isPlaying = false;
    };

    Player.prototype.playLast = function() {
      var last;
      if (this.isPlaying) {
        this.pauseCurrent();
      }
      last = this.audioPlayers[this.audioPlayers.length - 1];
      last.play();
      $(Sounder.renderer).trigger('start');
      return this.isPlaying = true;
    };

    Player.prototype.emptyPlayer = function() {
      this.audioPlayers = [];
      return this.currentTrack = 0;
    };

    Player.prototype.playCurrent = function() {
      var current;
      if (this.isPlaying) {
        this.pauseCurrent();
      }
      if (this.audioPlayers[this.currentTrack]) {
        current = this.audioPlayers[this.currentTrack];
        current.play();
        homer.$('.active').removeClass('active');
        homer.scrollCurrent();
        $(current).parent().addClass('active');
        $(Sounder.renderer).trigger('start');
        return this.isPlaying = true;
      }
    };

    return Player;

  })();

  (function() {
    return Sounder.player = new Player;
  })();

}).call(this);
