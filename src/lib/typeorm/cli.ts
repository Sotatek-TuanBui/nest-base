import { exec } from 'child_process';
import * as minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const filename = argv._[0];

if (!filename) {
    console.log('Please, insert a file name like below \n- npm run migrate:gen createUsersTable');
    process.exit(0);
}

exec(
    `ts-node ./node_modules/typeorm/cli.js migration:create ./src/database/migrations/${filename}`,
    (_err, stdout, stderr) => {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
      },
)

