module.exports = {
    _roll: function(d) {
        return Math.floor(Math.random() * d) + 1;
    },
    roll: function(self) {
        return function(req, res) {
            result = self._roll(req.body.sides);
            return res.send({
                'result': result
            });
        }
    },
    'routes': {
        post: {'/roll': 'roll'}
    },
    'root': '/common/dice',
    'name': 'Dice Rolls',
    'ns': 'crea.plugins.' + __filename.split('/').pop().replace('.js', '')
}