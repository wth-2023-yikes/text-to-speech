document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function () {
        const textInput = document.getElementById('textInput').value.trim();

        const accessKeyId = process.env.accessKeyId;
        const secretAccessKey = process.env.secretAccessKey;
        AWS.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: 'ap-southeast-1'
        });

        const polly = new AWS.Polly();

        const params = {
            OutputFormat: "mp3",
            SampleRate: "8000",
            // Text: "All Gaul is divided into three parts",
            Text: textInput,
            TextType: "text",
            VoiceId: "Joanna"
        };

        polly.synthesizeSpeech(params, function (err, data) {
            if (err) {
                console.error(err, err.stack);
            } else {
                const audioData = data.AudioStream;
                const blob = new Blob([audioData], { type: 'audio/mpeg' });

                const audioElement = new Audio();
                audioElement.src = URL.createObjectURL(blob);

                // Play the audio
                audioElement.play();
            }
        });
    });
});
