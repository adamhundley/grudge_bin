const EventEmitter = require('events');

let grudges = [];

const bin = new EventEmitter();

const binnedGrudges = localStorage.getItem('grudges');

if (binnedGrudges) {
  grudges = JSON.parse(binnedGrudges);
}

bin.all = () => grudges.concat([]);

bin.create = ({ person, wrong }) => {
  grudges = grudges.concat({ person, wrong, forgiven: false, id: Date.now() });
  bin.emit('change', grudges);
};

bin.forgive = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) {
      return grudge;
    } else {
      grudge.forgiven = true;
      return grudge;
    }
  });
  bin.emit('change', grudges);
};

bin.forgiven = () => {
  return grudges.filter(grudge => grudge.forgiven === true).length;
};

bin.unforgiven = () => {
  return grudges.filter(grudge => grudge.forgiven === false).length;
};

bin.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = bin;
