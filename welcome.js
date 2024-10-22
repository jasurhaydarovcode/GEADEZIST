import figlet from 'figlet';
import chalk from 'chalk';

figlet('GEADEZIST', function (err, data) {
    if (err) {
        console.log('Xato yuz berdi.');
        console.dir(err);
        return;
    }
    console.log(chalk.bgBlack.white.bold(data));
    console.log(chalk.red('GEADEZIYA\'ga xush kelibsiz! :)'));
});
