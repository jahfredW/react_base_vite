/**
 * 
 * @param {array} threshold 
 * @param {int} value 
 * @returns object with class tailwind color and type of emoji 
 */
const setColor = (threshold, value) => {
    // destructuration de threshold
    const { good, fair, moderate, poor } = threshold;

    switch (true) {
        case value <= good:
            return { color: 'text-green-500', emoji: '😀'};
        case value <= fair:
            return { color:'text-yellow-400', emoji: '🙂'};
        case value <= moderate:
            return { color:'text-orange-500', emoji: '😐'};
        case value <= poor:
            return { color:'text-red-500', emoji: '😕'};
        default:
            return { color: 'text-purple-500', emoji: '😠'}; // Or any other default color for values beyond "poor"
    }
}


const setAqiUtils = (aqiValue) => {
    let aqiSetup = {}
    switch(aqiValue){
        case 1:
            aqiSetup.color = 'text-green-500';
            aqiSetup.emoji = '😀';
            aqiSetup.text = 'Excellent'
            break;
        case 2:
            aqiSetup.color = 'text-yellow-400';
            aqiSetup.emoji = '🙂';
            aqiSetup.text = 'Bon'
            break;
        case null:
            aqiSetup.color = 'text-slate-500';
            aqiSetup.emoji = '⁉️';
            aqiSetup.text = 'Inconnu'

    }
    return aqiSetup;
}


const pollutionThresholds = [
    {
      polluant: 'pm10',
      thresholds: {
        good: 20,
        fair: 50,
        moderate: 100,
        poor: 200,
      },
    },
    {
      polluant: 'pm2_5',
      thresholds: {
        good: 10,
        fair: 25,
        moderate: 50,
        poor: 75,
      },
    },
    {
      polluant: 'so2',
      thresholds: {
        good: 20,
        fair: 80,
        moderate: 250,
        poor: 350,
      },
    },
    {
        polluant: 'no2',
        thresholds: {
          good: 40,
          fair: 70,
          moderate: 150,
          poor: 200,
        },
    },
    {
    polluant: 'co',
    thresholds: {
        good: 4400,
        fair: 9400,
        moderate: 12400,
        poor: 15400,
    },
    },
    {
    polluant: 'o3',
    thresholds: {
        good: 60,
        fair: 100,
        moderate: 140,
        poor: 180,
    },
    },
    
    
  ];

  export const PollutionUtils = {
    setColor,
    setAqiUtils,
    pollutionThresholds
}
