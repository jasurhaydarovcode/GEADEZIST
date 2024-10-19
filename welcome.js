import figlet from 'figlet';
import chalk from 'chalk';

figlet('GEADEZSIT', function (err, data) {
    if (err) {
        console.log('Xato yuz berdi.');
        console.dir(err);
        return;
    }
    console.log(chalk.bgCyan.black.bold(data));
    console.log(chalk.red('GEADEZIYA\'ga xush kelibsiz! :)'));
});
