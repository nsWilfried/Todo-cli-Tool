#! /usr/bin/env node
import { program } from "commander"
import chalk from "chalk"
import conf from "conf"
const config = new conf()
// console.log("tout va bien")
program.command('list')
.description("Lister toutes les taches de l'utilisateur")
.action(() =>{
    // console.log(chalk.green.bold("hello tout le monde js uis là "))
    const todos = config.get("todosList")
    // console.log("je suis la todo list", todos)
    if(todos != undefined || todos != null || todos.length == 0){
        todos.forEach((element, index) => {
            // console.log(element.task)

            if(element.done ==false ){
                console.log(chalk.red(`${index}- ${element.task}`))

            }else {
            console.log(chalk.green(`${index}- ${element.task}`))

            }
        });
    }else {
        console.log(chalk.red.bold("vous n'avez pas de tâches à faire"))
    }
})

program.command("add <task>")
.description("Ajouter une tache")
.action((task) =>{
    let todos = config.get("todosList")

    // console.log("je suis la tache", task)
    if(task==undefined){
       todos = []
    }else {
        todos.push({
            task: task, 
            done: false
        })
        
    }
      config.set("todosList", todos)
      
    return console.log(chalk.green("La tache a bien été ajouté"))
})

program.command("do")
.description("Ajouter un tâche")
.option("-t, --tasks <tasks...>", "La tache a activé")
.action(({tasks}) => {
    const todos = config.get("todosList")

    if (todos) {
        let todosList = todos.map((task, index) => {
            if (tasks) {
                if (tasks.indexOf(index.toString()) !== -1) {
                    task.done = true
                }
            } else {
                task.done = true
            }
            return task
        });

        config.set('todosList', todosList)
    }

    console.log(
        chalk.green.bold('Tasks have been marked as done successfully')
    )
})

program.command("remove")
.description("Supprimer une tache")
.option("-m, --remove <task>", "Index de la tache pour la supprimer")
.action((task) => {
    const todos = config.get("todosList")

    if(task){
        todos.splice(task, 1)
        config.set("todosList", todos)

    }else {
        console.log(chalk.red.bold("Id non existant"))
    }
})
program.parse()