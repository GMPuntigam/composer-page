/* Implementation of the presentation of the audio player */
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

var playIconContainers = document.getElementsByClassName('play-icon');
const audioPlayerContainer = document.getElementById('audio-player-container');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const muteIconContainer = document.getElementById('mute-icon');
let playState = 'play';
let muteState = 'unmute';
var i = 0;
var playing = 0;
const n_containers = playIconContainers.length;
var playAnimations = Array(n_containers);
for (let playIconContainer of playIconContainers) {
    playAnimations[i] = lottieWeb.loadAnimation({
        container: playIconContainer,
        path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Play Animation",
    });
    i++;
}

const muteAnimation = lottieWeb.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});
for (let playAnimation of playAnimations) {
    playAnimation.goToAndStop(14, true);
}
for (let playIconContainer of playIconContainers) {
    playIconContainer.addEventListener('click', function (event) {
        var targetElement = event.target;
        if (event.target == '') {
            var targetElement = event.currentTarget
            var elementID = event.currentTarget.parentNode.children[1].id
        }
        var elementID = targetElement.parentElement.id;
        if (elementID == '') {
            var elementID = event.currentTarget.parentNode.children[1].id
        }
        var animationID = elementID[elementID["length"] - 1]
        if (audio == event.currentTarget.parentNode.children[0]) {
            if (playState === 'play') {
                audio = event.currentTarget.parentNode.children[0]
                setMetadata();
                audio.play();
                playAnimations[animationID].playSegments([14, 27], true);
                playing = animationID;
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                playAnimations[animationID].playSegments([0, 14], true);
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        } else {
            audio.pause();
            if (playState === 'pause') {
                playAnimations[playing].playSegments([0, 14], true);
            }
            audio = event.currentTarget.parentNode.children[0]
            setMetadata();
            audio.play();
            playAnimations[animationID].playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
            playing = animationID;
        }

    });
}
muteIconContainer.addEventListener('click', () => {
    if (muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    } else {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});





/* Implementation of the functionality of the audio player */

var audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const outputContainer = document.getElementById('volume-output');
let raf = null;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    if (audio.buffered.length > 0) {
        const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    }

}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
    if (audio.currentTime == Math.floor(audio.duration)) {
        audio.pause();
        audio.currentTime = 0;
    }
}

const setMetadata = () => {
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }
}


audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if (!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if (!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
});