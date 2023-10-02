import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';


const insertTask = (taskText, user) => 
TasksCollection.insert({
   text: taskText ,
   userId: user._id,
   createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '7132b73a0333748cb842', // insert your clientId here
      secret: '9425f5bf3dcad802f5c85e836360c18f35baaaef', // insert your secret here
    },
  }
);
