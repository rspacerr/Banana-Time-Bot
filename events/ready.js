/* Log to console when activated */
module.exports = {
    name: 'ready',
    once: true,
    execute() {
        console.log('It\'s banana time.')
    }
}