// const obj = {
//   '1': 'Karen',
//   '2': 'Masha',
//   '3': 'Natasha'
// };

// function addIndexIfDuplicate(obj, newValue) {
//   // Создаем массив из существующих значений
//   const values = Object.values(obj);

//   // Если новое значение уже есть в объекте, добавляем индекс
//   if (values.includes(newValue)) {
//     let index = 1;
//     let newName = `${newValue}${index}`;

//     // Ищем уникальное имя, добавляя индекс, пока не найдем уникальное
//     while (values.includes(newName)) {
//       index++;
//       newName = `${newValue}${index}`;
//     }

//     // Добавляем уникальное имя с индексом в объект
//     obj[Object.keys(obj).length + 1] = newName;
//   } else {
//     // Если новое значение уникально, добавляем его как новую запись в объект
//     const newIndex = Object.keys(obj).length + 1;
//     obj[newIndex] = newValue;
//   }
// }

// // Пример использования
// addIndexIfDuplicate(obj, 'Karen'); // Добавит 'Karen1' в объект
// addIndexIfDuplicate(obj, 'Karen');
// addIndexIfDuplicate(obj, 'Karen');
// console.log(obj);

const fileSystem = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "folder1",
      type: "folder",
      children: [
        {
          name: "file1.txt",
          type: "file",
        },
        {
          name: "file2.txt",
          type: "file",
        },
      ],
    },
    {
      name: "folder2",
      type: "folder",
      children: [
        {
          name: "file3.txt",
          type: "file",
        },
      ],
    },
    {
      name: "file4.txt",
      type: "file",
    },
  ],
};


function traverseFileSystem(node, indent = 0) {
  const indentation = "  ".repeat(indent);
  console.log(`${indentation}${node.name}`);

  if (node.type === "folder" && node.children) {
    for (const child of node.children) {
      traverseFileSystem(child, indent + 1);
    }
  }
}

// Начинаем обход с корневой папки
traverseFileSystem(fileSystem);