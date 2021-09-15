const fs = require("fs");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  //функция получния всего файла
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    //чтение из файла
    if (err) {
      console.log("ERROR", err); //если ашибка то ощибка
    } else {
      const contacts = JSON.parse(data); //парсим json
      console.table(contacts); //вывод результата в консоль
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR", err); //если ашибка
    } else {
      const contacts = JSON.parse(data); //парсим json
      const filterContact = contacts.filter(
        (contact) => contact.id === parseInt(contactId) // перебираем масив и находим нужный id
      );
      if (filterContact.length) {
        console.table(filterContact); //вывод результата в консоль
      } else {
        console.log("not found");
      }
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR", err); //если ашибка
    } else {
      const contacts = JSON.parse(data); //парсим json
      const filterContacts = contacts.filter(
        (contact) => contact.id !== parseInt(contactId) //формируем новый массив без контакта с указанным ид
      );
      if (filterContacts) {
        // если массив существует то ппишем в файл
        fs.writeFile(
          contactsPath,
          JSON.stringify(filterContacts), // преобразование из JSON
          "utf-8",
          (err) => {
            if (err) {
              console.log("ERROR ", err);
            }
          }
        );
      }
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR", err); //если ашибка
    } else {
      const contacts = JSON.parse(data); //парсим json

      const newId = contacts[contacts.length - 1].id + 1; //создаем новый элемент массива
      const contact = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
      };

      const newContact = [...contacts, contact]; //распыляем старый массив и добавляем новый элемнт
      fs.writeFile(contactsPath, JSON.stringify(newContact), "utf-8", (err) => {
        //перезаписываем файл
        if (err) {
          console.log("ERROR ", err);
        }
      });
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact }; //экспортируем функции как модули
