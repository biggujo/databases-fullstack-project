import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18n = i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources: {
    en: {
      translation: {
        homePage: 'HomePage',
        aboutPage: 'AboutPage',
        taskList: 'Task List',
        addTask: 'Add Task',
        taskItems: 'Task Items',
        subtasks: 'Subtasks',
        noTasks: 'There is no tasks for now',
        enterUsername: 'Enter a username',
        createPassword: 'Create a password',
        confirmPassword: 'Confirm your password',
        signUp: 'Sign Up',
        username: 'Username',
        password: 'Password',
        rememberMe: 'Remember me?',
        login: 'Login',
        joinGroup: 'Join group',
        openGroup: 'Open group',
        leaveGroup: 'Leave',
        myGroups: 'My Groups',
        joinedGroups: 'Joined groups:',
        createNewGroup: 'Create a new group...',
        createGroup: 'Create Group',
        list: 'List:',
        groups: 'Groups',
        groupItems: 'Group Items',
        availableAmount: 'Available amount:',
        searchGroups: 'Search for groups...',
        search: 'Search',
        filter: 'Filter',
        startDate: 'Start date',
        endDate: 'End date',
        status: 'Status',
        sortDeadline: 'Sort deadlines',
        sortName: 'Sort names',
        byAscending: 'By ascending',
        byDescending: 'By descending',
        completed: 'Completed',
        inProgress: 'In progress',
        overdue: 'Overdue',
        results: 'Results',
        members: 'Members: {{count}}',
        join: 'Join',
        leave: 'Leave',
        required: 'Required',
        usernameTooShort: 'Username must be at least 6 characters long',
        passwordTooShort: 'Password must contain at least 6 characters',
        welcome: 'Welcome!',
        lorem: 'Our application is designed to simplify task management.',
        sed: 'It will help you efficiently manage projects, track tasks, and collaborate with other users.',
        hello: 'Hello, {{username}}',
        howAreYou: 'How are you doing?',
        myTasks: 'My tasks',
        loginPrompt: 'Log in now to start',
        noTasksAvailable: 'No tasks available',
        noGroupsAvailable: 'No groups available',
        groupNamePlaceholder: 'Healthy Living Initiative',
        membersMoreThan: 'Members more than',
        clear: 'Clear',
        name: 'Name',
        text: 'Text',
        description: 'Description',
        deadline: 'Deadline',
        time: 'Time:',
        placeholderText: 'Buy groceries',
        placeholderDescription: 'Three apples, four sausages...',
        submit: 'Submit',
        editTask: 'Edit the task',
        deleteTask: 'Delete the task',
        due: 'Due',
        at: 'о',
        all: 'All',
        tasks: 'Tasks',
        allGroups: 'All Groups',
        group: 'Group',
        listOfMembers: 'List of members',
        you: 'You',
        logOut: 'Log Out',
        signIn: 'Sign In',
        databaseProject: 'Databases Project',
      },
    },
    ua: {
      translation: {
        homePage: 'Домашня сторінка',
        aboutPage: 'Про нас',
        taskList: 'Список завдань',
        addTask: 'Додати завдання',
        taskItems: 'Завдання',
        subtasks: 'Підзавдання',
        noTasks: 'Наразі немає завдань',
        enterUsername: 'Введіть ім\'я користувача',
        createPassword: 'Створити пароль',
        confirmPassword: 'Підтвердіть пароль',
        signUp: 'Зареєструватися',
        username: 'Ім\'я користувача',
        password: 'Пароль',
        rememberMe: 'Запам\'ятати мене?',
        login: 'Увійти',
        joinGroup: 'Долучитися до групи',
        openGroup: 'Відкрити групу',
        leaveGroup: 'Покинути групу',
        myGroups: 'Мої групи',
        joinedGroups: 'Приєднані групи:',
        createNewGroup: 'Створити нову групу...',
        createGroup: 'Створити групу',
        list: 'Список:',
        groups: 'Групи',
        groupItems: 'Список груп',
        availableAmount: 'Доступна кількість:',
        searchGroups: 'Пошук груп...',
        search: 'Пошук',
        filter: 'Фільтр',
        startDate: 'Початкова дата',
        endDate: 'Кінцева дата',
        status: 'Статус',
        sortDeadline: 'Дедлайни',
        sortName: 'Сортування назв',
        byAscending: 'За зростанням',
        byDescending: 'За спаданням',
        completed: 'Завершено',
        inProgress: 'У процесі',
        overdue: 'Прострочено',
        results: 'Результати',
        members: 'Учасники: {{count}}',
        join: 'Приєднатися',
        leave: 'Залишити',
        required: 'Обов\'язкова умова',
        usernameTooShort: 'Ім\'я користувача повинно мати довжину не менше 6 символів',
        passwordTooShort: 'Пароль повинен містити щонайменше 6 символів',
        welcome: 'Вітаємо!',
        lorem: 'Наш додаток призначений для спрощення управління роботи із задачами.',
        sed: 'Він допоможе Вам ефективно керувати проектами, відстежувати задачі та співпрацювати з іншими користувачами.',
        hello: 'Привіт, {{username}}',
        howAreYou: 'Як у тебе справи?',
        myTasks: 'Мої завдання',
        loginPrompt: 'Увійдіть зараз, щоб розпочати використання',
        clear: 'Очистити',
        name: 'Назва',
        text: 'Текст',
        description: 'Опис',
        deadline: 'Термін',
        noTasksAvailable: 'Нема доступних завдань',
        noGroupsAvailable: 'Нема доступних груп',
        groupNamePlaceholder: 'Подорож до Альп',
        membersMoreThan: 'Учасників більше за',
        time: 'Час:',
        placeholderText: 'Купити продукти',
        placeholderDescription: 'Два яйця, одна сосиска...',
        submit: 'Додати',
        editTask: 'Редагувати завдання',
        deleteTask: 'Видалити завдання',
        due: 'До',
        at: 'о',
        all: 'Всі',
        tasks: 'Задачі',
        listOfMembers: 'Список учасників',
        you: 'Ви',
        allGroups: 'Всі групи',
        group: 'Група',
        logOut: 'Вийти',
        signIn: 'Увійти',
        databaseProject: 'Databases Project',
      },
    },
  },
  fallbackLng: 'ua',
  debug: true,
  detection: {
    order: [
      'querystring',
      'cookie',
      'localStorage',
      'navigator',
      'htmlTag',
      'path',
      'subdomain',
    ],
    caches: [
      'cookie',
      'localStorage',
    ],
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

