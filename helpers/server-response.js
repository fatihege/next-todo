export const RESPONSE_TYPES = {
    REGISTERED_EMAIL: 'REGISTERED_EMAIL',
    UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
    EMPTY_FIELDS: 'EMPTY_FIELDS',
    INCORRECT_EMAIL: 'INCORRECT_EMAIL',
    PASSWORDS_NOT_MATCH: 'PASSWORDS_NOT_MATCH',
    ERROR_CREATING_USER: 'ERROR_CREATING_USER',
    USER_CREATED: 'USER_CREATED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    ERROR_LOGGING_IN: 'ERROR_LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    ERROR_LOG_OUT: 'ERROR_LOG_OUT',
    LOGGED_OUT: 'LOGGED_OUT',
    TODO_LIST_CREATED: 'TODO_LIST_CREATED',
    ERROR_CREATING_TODO_LIST: 'ERROR_CREATING_TODO_LIST',
    TODO_LIST_UPDATED: 'TODO_LIST_UPDATED',
    ERROR_UPDATING_TODO_LIST: 'ERROR_UPDATING_TODO_LIST',
    TODO_LIST_DELETED: 'TODO_LIST_DELETED',
    ERROR_DELETING_TODO_LIST: 'ERROR_DELETING_TODO_LIST',
    TODO_LIST_STARRED: 'TODO_LIST_STARRED',
    TODO_LIST_UNSTARRED: 'TODO_LIST_UNSTARRED',
    TODO_LIST_ARCHIVED: 'TODO_LIST_ARCHIVED',
    TODO_LIST_UNARCHIVED: 'TODO_LIST_UNARCHIVED',
    ERROR_STARRING_LIST: 'ERROR_STARRING_LIST',
    ERROR_UNSTARRING_LIST: 'ERROR_UNSTARRING_LIST',
    ERROR_ARCHIVING_LIST: 'ERROR_ARCHIVING_LIST',
    ERROR_UNARCHIVING_LIST: 'ERROR_UNARCHIVING_LIST',
    TASK_COMPLETED: 'TASK_COMPLETED',
    TASK_UNCOMPLETED: 'TASK_UNCOMPLETED',
    ERROR_COMPLETING_TASK: 'ERROR_COMPLETING_TASK',
    ERROR_UNCOMPLETING_TASK: 'ERROR_UNCOMPLETING_TASK',
    USER_UPDATED: 'USER_UPDATED',
    ERROR_UPDATING_USER: 'ERROR_UPDATING_USER',
    NO_PROFILE_IMAGE: 'NO_PROFILE_IMAGE',
    UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
    PROFILE_PHOTO_UPLOADED: 'PROFILE_PHOTO_UPLOADED',
    ERROR_UPLOADING_IMAGE: 'ERROR_UPLOADING_IMAGE',
    PROFILE_PHOTO_REMOVED: 'PROFILE_PHOTO_REMOVED',
    ERROR_REMOVING_PROFILE_PHOTO: 'ERROR_REMOVING_PROFILE_PHOTO',
    SAME_PASSWORD: 'SAME_PASSWORD',
    PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT',
}

export default (type, data = []) => {
    let response = {
        title: null,
        description: null,
    }

    switch (type) {
        case RESPONSE_TYPES.REGISTERED_EMAIL:
            response.title = 'What\'s going on?'
            response.description = 'A user with this email address already exists. Why don\'t you try logging in?'
            break
        case RESPONSE_TYPES.UNAUTHORIZED_ACCESS:
            response.title = 'Psst, we got you!'
            response.description = 'Attempting to send an unauthorized request to the server. What is happening there?'
            break
        case RESPONSE_TYPES.EMPTY_FIELDS:
            response.title = 'Come on dude!'
            response.description = 'It looks like the form you submitted has blank fields. They are needed by us, please fill them out.'
            break
        case RESPONSE_TYPES.INCORRECT_EMAIL:
            response.title = 'Hey, we got you!'
            response.description = 'You are trying to enter an email that is not an email. Please enter a valid email address!'
            break
        case RESPONSE_TYPES.PASSWORDS_NOT_MATCH:
            response.title = 'Check again 🙂👓'
            response.description = 'The passwords you entered do not match, please match them first!'
            break
        case RESPONSE_TYPES.ERROR_CREATING_USER:
            response.title = 'Oh, we\'re so sorry'
            response.description = 'We encountered a problem creating your account. Don\'t worry, we\'re already working on fixing this. You can try again in a few hours.'
            break
        case RESPONSE_TYPES.USER_CREATED:
            response.title = 'That\'s it!'
            response.description = 'You have successfully created your account. Now the next step? Login!'
            break
        case RESPONSE_TYPES.USER_NOT_FOUND:
            response.title = 'Oh, man...'
            response.description = 'There is no user for this information. Are you sure you registered?'
            break
        case RESPONSE_TYPES.ERROR_LOGGING_IN:
            response.title = 'Is everything okay?'
            response.description = 'Calm down! We\'ve detected a problem with our servers. But don\'t worry, we\'ve started working on it. We will be happy to see you in a few hours 😊'
            break
        case RESPONSE_TYPES.LOGGED_IN:
            response.title = 'And voila!'
            response.description = 'You are great! Login successful. Now you can go to your panel.'
            break
        case RESPONSE_TYPES.INCORRECT_PASSWORD:
            response.title = 'Your password? 🐟'
            response.description = 'The password you entered does not match the password of your account.'
            break
        case RESPONSE_TYPES.ERROR_LOG_OUT:
            response.title = 'Hey 😊'
            response.description = 'Oh no! We ran into a problem trying to sign out of your account. Looks like you\'re with us for a while 😊'
            break
        case RESPONSE_TYPES.LOGGED_OUT:
            response.title = 'Why 🥺'
            response.description = 'That\'s sad... We hope to see you here again next time 🥹'
            break
        case RESPONSE_TYPES.TODO_LIST_CREATED:
            response.title = 'Hooray! 🤗'
            response.description = 'Your new to-do dashboard has been created. Now go and add some tasks. (Don\'t forget to make them on time 😉)'
            break
        case RESPONSE_TYPES.ERROR_CREATING_TODO_LIST:
            response.title = 'Aw what\'s going on'
            response.description = 'We encountered an error while creating your new todo list. But don\'t worry, we\'ve already started working on it. You just write down these tasks elsewhere and leave the rest to us!'
            break
        case RESPONSE_TYPES.TODO_LIST_UPDATED:
            response.title = 'Updated! 🎉'
            response.description = 'Successfully updated your todo list. 🥳'
            break
        case RESPONSE_TYPES.ERROR_UPDATING_TODO_LIST:
            response.title = 'Oh, sorry 🥹'
            response.description = 'We are unable to update the todo list, we encountered a problem. We\'ll solve it as soon as possible, please try again later.'
            break
        case RESPONSE_TYPES.TODO_LIST_DELETED:
            response.title = 'Okey!'
            response.description = 'We deleted your todo list. Now is the time to open up to new tasks!'
            break
        case RESPONSE_TYPES.ERROR_DELETING_TODO_LIST:
            response.title = 'Oh stop'
            response.description = 'This todo list could not be deleted, possibly a minor error. We\'re working on this, please try again later.'
            break
        case RESPONSE_TYPES.TODO_LIST_STARRED:
            response.title = 'Yep!'
            response.description = 'It seems that the todos on this list are important. Don\'t worry, your list has been added to the starred lists. 🙂'
            break
        case RESPONSE_TYPES.TODO_LIST_UNSTARRED:
            response.title = 'Alright'
            response.description = 'We removed your list from the starred lists. Don\'t forget to do the things to do 😉'
            break
        case RESPONSE_TYPES.TODO_LIST_ARCHIVED:
            response.title = 'Hm, okay'
            response.description = 'Your list has been added to the archived lists. I guess it\'s less important now?'
            break
        case RESPONSE_TYPES.TODO_LIST_UNARCHIVED:
            response.title = 'Yes, there it is'
            response.description = 'The list has been unarchived. Now it\'s time to keep doing the todos 🥳'
            break
        case RESPONSE_TYPES.ERROR_STARRING_LIST:
            response.title = 'No way!'
            response.description = 'There was a goddamn problem starring your list. Please try again later, because we\'re already working on it.'
            break
        case RESPONSE_TYPES.ERROR_UNSTARRING_LIST:
            response.title = 'Interesting 🧐'
            response.description = 'There was an error removing your list from the starred lists. You can try again later, but it looks like this list will continue to be your favorite for a while 😊'
            break
        case RESPONSE_TYPES.ERROR_ARCHIVING_LIST:
            response.title = 'Unluckily...'
            response.description = 'We ran into a problem archiving your list. We recommend that you try again soon. 😊'
            break
        case RESPONSE_TYPES.ERROR_UNARCHIVING_LIST:
            response.title = 'Impossible 😣'
            response.description = 'There was a problem unarchiving your list. We\'re working on it, but it looks like you\'ll have to wait a bit to highlight these todos 🥺'
            break
        case RESPONSE_TYPES.TASK_COMPLETED:
            response.title = 'You\'re great!'
            response.description = 'So you\'ve completed the todo, which is great news. Now you can move on to your next todo.'
            break
        case RESPONSE_TYPES.TASK_UNCOMPLETED:
            response.title = 'Oh, okay'
            response.description = 'It seems you didn\'t do your todo. We expect you to complete this todo as soon as possible 😊'
            break
        case RESPONSE_TYPES.ERROR_COMPLETING_TASK:
            response.title = 'What the hell?!'
            response.description = 'We know you\'ve completed your todo, but something went wrong with our server. You\'ll have to wait a bit to save this. Sorry 🥹'
            break
        case RESPONSE_TYPES.ERROR_UNCOMPLETING_TASK:
            response.title = 'Ow'
            response.description = 'Looks like you didn\'t complete your todo. It\'s good that you know this, but our servers won\'t be able to find out for a while 😶'
            break
        case RESPONSE_TYPES.USER_UPDATED:
            response.title = 'Sure! 😊'
            response.description = 'Your new account information has been successfully saved. Now you can continue to use our application with your new credentials.'
            break
        case RESPONSE_TYPES.ERROR_UPDATING_USER:
            response.title = 'What was that!?'
            response.description = 'An unexpected error occurred while saving your new account information. You should continue to use with these credentials for a while, we will fix the problem as soon as possible!'
            break
        case RESPONSE_TYPES.NO_PROFILE_IMAGE:
            response.title = 'Hey stop!'
            response.description = 'In order to do this, you need to upload an image.'
            break
        case RESPONSE_TYPES.UNSUPPORTED_FILE_TYPE:
            response.title = 'Sorry, no'
            response.description = 'We do not allow the type of file you are trying to upload. How about choosing a nice image and uploading it? 🤗'
            break
        case RESPONSE_TYPES.PROFILE_PHOTO_UPLOADED:
            response.title = 'You look great! ✨'
            response.description = 'You look very stylish today too! Now you can continue using our app with your brand new profile photo.'
            break
        case RESPONSE_TYPES.ERROR_UPLOADING_IMAGE:
            response.title = 'This is very bad! 😣'
            response.description = 'We ran into a problem trying to upload the new profile photo. Do not worry! We\'ve already started working on solving it.'
            break
        case RESPONSE_TYPES.PROFILE_PHOTO_REMOVED:
            response.title = 'Nice, okay'
            response.description = 'We have removed the profile picture. But if you want to see a great photo on your interface, we recommend uploading one again!'
            break
        case RESPONSE_TYPES.ERROR_REMOVING_PROFILE_PHOTO:
            response.title = 'Bad news'
            response.description = 'An unexpected error occurred while removing your profile photo. We have started working but it looks like you will continue to see this photo for a while 😊'
            break
        case RESPONSE_TYPES.SAME_PASSWORD:
            response.title = 'Stop! 🤨'
            response.description = 'The new password cannot be the same as the old password. This is not a change!'
            break
        case RESPONSE_TYPES.PASSWORD_TOO_SHORT:
            response.title = 'That\'s not how'
            response.description = `The password you are trying to enter is too short. Please choose a password of at least ${data[0] || 6} characters.`
            break
        default:
            response.title = 'We\'re sorry 🥺'
            response.description = 'An unexpected error was detected during this operation. But don\'t worry, we\'ve already started working on it! You can try again in a few hours 😊'
            break
    }

    return response || new Error('Undefined response')
}