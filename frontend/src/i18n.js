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
                    homePage: "HomePage",
                    aboutPage: "AboutPage",
                    taskList: "Task List",
                    addTask: "Add Task",
                    taskItems: "Task items",
                    noTasks: "There is no tasks for now",
                    enterUsername: "Enter a username",
                    createPassword: "Create a password",
                    confirmPassword: "Confirm your password",
                    signUp: "Sign Up",
                    username: "Username",
                    password: "Password",
                    rememberMe: "Remember me?",
                    login: "Login",
                    myGroups: "My Groups",
                    joinedGroups: "Joined groups:",
                    createNewGroup: "Create a new group...",
                    createGroup: "Create Group",
                    list: "List:",
                    groups: "Groups",
                    availableAmount: "Available amount:",
                    searchGroups: "Search for groups...",
                    members: "Members: {{count}}",
                    join: "Join",
                    leave: "Leave"
                },
            },
            ua: {
                translation: {
                    homePage: "Домашня сторінка",
                    aboutPage: "Про нас",
                    taskList: "Список завдань",
                    addTask: "Додати завдання",
                    taskItems: "Елементи завдань",
                    noTasks: "Наразі немає завдань",
                    enterUsername: "Введіть ім'я користувача",
                    createPassword: "Створити пароль",
                    confirmPassword: "Підтвердіть пароль",
                    signUp: "Зареєструватися",
                    username: "Ім'я користувача",
                    password: "Пароль",
                    rememberMe: "Запам'ятати мене?",
                    login: "Увійти",
                    myGroups: "Мої групи",
                    joinedGroups: "Приєднані групи:",
                    createNewGroup: "Створити нову групу...",
                    createGroup: "Створити групу",
                    list: "Список:",
                    groups: "Групи",
                    availableAmount: "Доступна кількість:",
                    searchGroups: "Пошук груп...",
                    members: "Учасники: {{count}}",
                    join: "Приєднатися",
                    leave: "Залишити"
                },
            },
        },
        fallbackLng: 'ua',
        debug: true,
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;