<template>
  <div
    v-cloak
    id="stage"
    class="stage"
    :class="{'menu-open': menuOpen, 'voices-open': voicesOpen}"
    :style="{ color: activeReminder.waveFrontColor, backgroundColor: stageBg }"
  >
    <div
      class="waves"
      :style="waveStyles"
    >
      <div
        class="wave wave--back"
        :style="{ color: activeReminder.waveBackColor }"
      >
        <div class="water">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 32"
            preserveAspectRatio="none"
          >
            <title>wave2</title>
            <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
          </svg>
        </div>
        <div class="water">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 32"
            preserveAspectRatio="none"
          >
            <title>wave2</title>
            <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
          </svg>
        </div>
      </div>
      <div
        class="wave wave--front"
        :style="{ color: activeReminder.waveFrontColor }"
      >
        <div class="water">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 32"
            preserveAspectRatio="none"
          >
            <title>wave2</title>
            <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
          </svg>
        </div>
        <div class="water">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 32"
            preserveAspectRatio="none"
          >
            <title>wave2</title>
            <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="percent">
        <transition
          name="percent-left"
          mode="out-in"
        >
          <div :key="percentsLeft">{{ percentsLeft }}</div>
        </transition>
        <span>%</span>
      </div>
    </div>
    <button @click="reset">
      {{ percentsLeft > 0 ? activeReminder.buttonTxt : 'Reset' }}
    </button>
  </div>
</template>

<script>
var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition || undefined
var numbers = Array.apply(null, Array(101)).map(function(_, i) { return i })

if (SpeechRecognition) {
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList || undefined
  var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent || undefined

  var commands = ['reset', 'timer', ...numbers]
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + commands.join(' | ') + ' ;'

  var speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)

  var recognition = new SpeechRecognition()
  recognition.grammars = speechRecognitionList
  // recognition.continuous = false;
  recognition.lang = 'en-US'
  recognition.interimResults = true
  recognition.maxAlternatives = 1
}

var speechSynth = new SpeechSynthesisUtterance()

const padDigits = (number, digits) => {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
}

const calculatePercentsLeft = (value, from) => {
  return Math.floor(Math.ceil(value / 1000) / (from * 60) * 100)
}

const calculateScaleFactor = (percent) => {
  return 1 - (100 - percent) / 100
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

const settings = {
  water: {
    warningMsg: 'Remember to drink',
    timeIsUpMsg: 'Time\'s up. You really need to drink now',
    buttonTxt: 'Drink',
    waveFrontColor: '#32BAFA',
    waveBackColor: '#2C7FBE',
    stageBg: '#1E384C',
    durationInMinutes: 1
  },
  coffee: {
    warningMsg: `It's almost coffee time.`,
    timeIsUpMsg: 'Time\'s up. Let\'s take a coffee break!',
    buttonTxt: 'Drink coffee',
    waveFrontColor: '#b39374',
    waveBackColor: '#7a6057',
    stageBg: '#392a2c',
    durationInMinutes: 1
  },
  break: {
    warningMsg: 'It is time to rest your eyes soon!',
    timeIsUpMsg: 'Time\'s up. Now, it\'s really time to rest your eyes!',
    buttonTxt: 'Take a break',
    waveFrontColor: '#02C39A',
    waveBackColor: '#028090',
    stageBg: '#012F35',
    durationInMinutes: 1
  },
  beer: {
    warningMsg: `I know this sounds scary, but it's almost time for another beer`,
    timeIsUpMsg: `It's been while since the last beer!`,
    buttonTxt: 'Have a beer',
    waveFrontColor: '#F1B10F',
    waveBackColor: '#FFFFFF',
    stageBg: '#5A3900',
    durationInMinutes: 60
  }
}

export default {
  name: 'SearchBar',
  data() {
    return {
      color: '',
      percents: [100],
      percentsLeft: 10,
      secondsLeft: 0,
      waveStyles: '',
      duration: 1,
      timer: [],
      voicesOpen: false,
      voices: [],
      selectedVoice: {},
      countdownObj: {},
      activeReminder: settings.water,
      menuOpen: false,
      isListening: false,
      tooltipText: 'Say eg. "reset"',
      stageBg: settings.water.stageBg
    }
  },
  computed: {
    supportSpeechSynth() {
      return 'speechSynthesis' in window
    },
    supportSpeechRecognition() {
      return SpeechRecognition
    }
  },
  watch: {
    percentsLeft: function(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.percents.splice(0, 1)
      this.percents.push(val)
    }
  },
  mounted() {
    this.resetTimer()
    this.voices = speechSynthesis.getVoices()

    if (this.voices.length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices()
      }
    }
  },
  methods: {
    setActiveReminder(reminder) {
      this.activeReminder = settings[reminder]
      this.stageBg = this.activeReminder.stageBg
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      if (this.menuOpen) {
        this.pauseTimer()
        this.waveStyles = `transform: translate3d(0,100%,0); transition-delay: .25s;`
      } else {
        this.continueTimer()
      }
    },
    toggleVoicesMenu() {
      this.voicesOpen = !this.voicesOpen
    },
    voiceSelected(voice) {
      this.selectedVoice = voice
      speechSynth.voice = voice
    },
    start(reminder) {
      this.setActiveReminder(reminder)
      this.percents = [100]
      this.timer = []
      this.menuOpen = false
      this.resetTimer()
    },
    resetTimer() {
      const durationInSeconds = 60 * this.activeReminder.durationInMinutes
      this.startTimer(durationInSeconds)
    },
    startTimer(secondsLeft) {
      const now = new Date()

      // later on, this timer may be stopped
      if (this.countdown) {
        window.clearInterval(this.countdown)
      }
      this.countdown = (ts => {
        this.secondsLeft = Math.ceil(ts.value / 1000)
        this.percentsLeft = calculatePercentsLeft(ts.value, this.activeReminder.durationInMinutes)
        this.waveStyles = `transform: scale(1,${calculateScaleFactor(this.percentsLeft)})`
        this.updateCountdown(ts)
        if (this.percentsLeft === 10) {
          this.giveWarning()
        }
        if (this.percentsLeft <= 0) {
          this.timeIsUpMessage()
          this.pauseTimer()
          this.timer = []
          setTimeout(() => {
            this.startListenVoiceCommands()
          }, 1500)
        }
      }, now.getTime() + (secondsLeft * 1000))
    },
    updateCountdown(ts) {
      if (this.timer.length > 2) {
        this.timer.splice(2)
      }

      const newTime = {
        id: guid(),
        value: `${padDigits(ts.minutes, 2)}:${padDigits(ts.seconds, 2)}`
      }

      this.timer.unshift(newTime)
    },
    pauseTimer() {
      window.clearInterval(this.countdown)
    },
    continueTimer() {
      if (this.secondsLeft > 0) {
        this.startTimer(this.secondsLeft - 1)
      }
    },
    giveWarning() {
      speechSynth.text = this.activeReminder.warningMsg
      window.speechSynthesis.speak(speechSynth)
    },
    timeIsUpMessage() {
      speechSynth.text = this.activeReminder.timeIsUpMsg
      window.speechSynthesis.speak(speechSynth)
    },
    timerResetMessage() {
      speechSynth.text = `Timer reset. Time left ${this.activeReminder.durationInMinutes} ${this.activeReminder.durationInMinutes > 1 ? 'minutes' : 'minute'}`
      window.speechSynthesis.speak(speechSynth)
    },
    reset() {
      this.resetTimer()
      this.timerResetMessage()
    },
    startListenVoiceCommands() {
      if (this.isListening || !this.supportSpeechRecognition) return

      this.isListening = true
      recognition.start()
      recognition.onresult = (event) => {
        const last = event.results.length - 1
        const transcript = event.results[last][0].transcript
        const splittedTranscript = transcript.split(' ')
        const isFinal = event.results[last].isFinal

        this.tooltipText = transcript

        if (transcript === 'reset') {
          this.resetTimer()
          this.timerResetMessage()
        }
        if (
          splittedTranscript.length >= 3 &&
          splittedTranscript[0] === 'timer' &&
          isFinal &&
          numbers.includes(Number(splittedTranscript[1])) &&
          (splittedTranscript[2] === 'minute' || splittedTranscript[2] === 'minutes')
        ) {
          this.activeReminder.durationInMinutes = numbers[splittedTranscript[1]]
          this.resetTimer()
          this.timerResetMessage()
        }
      }
      recognition.onend = () => {
        this.isListening = false
        this.tooltipText === ''
        recognition.stop()
      }
      recognition.onsoundend = () => {
        this.isListening = false
        recognition.stop()
      }
    },
    mouseOver(type) {
      this.stageBg = settings[type].stageBg
    },
    mouseOut() {
      this.stageBg = this.activeReminder.stageBg
    }
  }
}

</script>

<style lang="scss" scoped>
$blue-dark: #1e384c;
$blue: #2c7fbe;
$blue-light: #32bafa;
$green: #02c39a;
$stage-bg: $blue-dark;

[v-cloak] {
  display: none;
}
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
}

::-webkit-scrollbar {
  display: none;
}

.stage {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: $stage-bg;
  transition: background-color 0.3s;

  max-height: 300px;
  max-width: 300px;
  border-radius: 50%;

  // @media (min-width: 500px) {
  //   border-radius: 5px;
  //   max-height: 550px;
  //   max-width: 350px;
  // }

  &.menu-open {
    .microphone {
      transform: translate3d(-1em, 0, 0);
      opacity: 0;
    }
    .voices-menu__button {
      z-index: 40;
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    .menu {
      z-index: 25;
    }
    .time {
      transform: translate3d(0, -200%, 0);
      transition: 0.5s opacity, 0.5s transform;
      opacity: 0;
    }
    button {
      transform: translate3d(0, 100%, 0);
      transition-delay: 0s;
      opacity: 0;
    }
    .percent {
      transition: 0.4s opacity, 0.4s transform;
      transform: translate3d(0, 50%, 0);
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.voices-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media (min-width: 500px) {
    border-radius: 5px;
    overflow: hidden;
  }

  &__bg {
    position: absolute;
    top: -15em;
    left: -15em;
    transform-origin: 50% 50%;
    width: 20em;
    height: 20em;
    color: #222;
    transform: scale(0.2);
    transition: transform 0.3s;
  }

  &__button {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.8em 0.6em;
    color: rgba(#fff, 0.5);
    opacity: 0;
    cursor: pointer;
    transform: translate3d(1em, 0, 0);
    transition: opacity 0.3s, transform 0.3s, color 0.2s;

    &:hover {
      color: rgba(#fff, 0.8);
    }

    > * {
      vertical-align: middle;
      font-weight: 300;
      letter-spacing: 1px;
    }
    svg {
      width: 1.8em;
      height: 1.8em;
    }
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 10px;
    font-size: 2em;
    font-weight: 300;
    color: rgba(#fff, 0.5);
    opacity: 0;
    cursor: pointer;
    transform: translate3d(1em, 0, 0) rotate(45deg);
    transition: opacity 0.3s, transform 0.3s, color 0.2s;

    svg {
      width: 1em;
      height: 1em;
    }

    &:hover {
      color: rgba(#fff, 0.8);
    }
  }
}
.voices-list-wrapper {
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  opacity: 0;
}
.voices-list {
  margin: 0;
  padding: 0;

  &__item {
    display: block;
    opacity: 0;
    transform: translate(0, 1em);

    &.is-selected {
      .voices-list__icon {
        opacity: 1;
        transform: translate3d(0, 0, 0) rotate(0);
      }
    }
  }

  &__icon {
    position: relative;
    margin-right: 20px;
    color: $green;
    opacity: 0;
    transform: translate3d(-1em, 0, 0) rotate(-30deg);
    transition: opacity 0.2s, transform 0.2s;

    svg {
      width: 1.2em;
      height: 1.2em;
    }
  }

  &__link {
    display: flex;
    padding: 0.5em 1.1em;
    font-size: 1.3em;
    font-weight: 300;
    color: rgba(#fff, 0.8);
    text-decoration: none;

    &:hover {
      background: rgba(#fff, 0.05);
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }

  &__content {
    line-height: 1;
    span {
      font-size: 0.5em;
    }
  }

  &__default {
    color: $green;
  }
}

.content {
  z-index: 20;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time {
  overflow: hidden;
  padding: 1em;
  font-size: 1.1em;
  text-align: center;
  transition: 0.5s 0.2s opacity, 0.5s transform 0.2s;
}

.timer__item {
  transition: all 1s;
  margin-right: 10px;
  color: rgba(#fff, 0.8);

  &:first-child,
  &:nth-child(3) {
    color: rgba(#fff, 0.2);
  }
}
.timer-enter,
.timer-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.timer-leave-to {
  transition-duration: 0.5s;
}
.timer-leave-active {
  transform: translate3d(0, 0, 0);
}

.percent {
  z-index: 2;
  position: relative;
  font-size: 7em;
  font-weight: 100;
  color: rgba(#fff, 0.7);
  transition: 0.4s 0.2s opacity, 0.4s 0.2s transform;

  > div {
    display: inline-block;
  }
  > span {
    font-size: 0.4em;
  }
}
.percent-left-enter-active,
.percent-left-leave-active {
  transition: transform 0.1s ease;
}
.percent-left-enter,
.percent-left-leave-to {
  transform: scale(1.05);
}

button {
  z-index: 20;
  position: absolute;
  display: block;
  width: 70%;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 1.5em;
  padding: 0.6em;

  color: rgba(#fff, 0.8);
  font-size: 1.1em;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: transparent;
  border: 1px solid rgba(#fff, 0.8);
  border-radius: 2em;
  outline: none;
  transition: 0.2s background, 0.4s 0.3s transform, 0.4s 0.3s opacity;
  cursor: pointer;

  &:hover {
    background: #fff;
    color: currentColor;
  }
}
.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.4s transform ease;
  transform-origin: bottom center;
  @media (min-width: 500px) {
    border-radius: 5px;
  }
}
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: wave 3s linear infinite;

  &--front {
    z-index: 2;
    color: $blue-light;
  }

  &--back {
    z-index: 1;
    color: $blue;
    animation-direction: reverse;
  }
}

.water {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background: currentColor;

  svg {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 99.9%;
  }
}
.water:first-of-type {
  transform: translate(-100%, 0);
}

svg {
  fill: currentColor;
}

@keyframes wave {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0.5em, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulseAway {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
  }
}
</style>
