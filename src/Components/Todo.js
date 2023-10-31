import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

const Todo = () => {

    const getLocalDate = () => {
        const mytasks = localStorage.getItem("myTaskLists");
        if(mytasks){
            return JSON.parse(mytasks);
        }else{
            return [];
        }
    };

    const [taskname, setTaskname] = useState("");
    const [mytasks, setMytasks] = useState(getLocalDate());
    const [editTaskData,setEditTaskData] = useState([]);
    const inputRef= useRef();
    
    const addTask = () => { // Add new Task
        if (taskname) {

            mytasks.filter( (currEle) => {
                if(taskname == currEle.task_name){
                    return (
                        alert("Task Name already Exists")
                    )
                }
            });
            if(editTaskData !== ''){
                 console.log(editTaskData)
                setMytasks(
                    mytasks.map( (currEle) => {
                        if(currEle.id == editTaskData.id){
                            return {...currEle,task_name:taskname};
                        }
                        return currEle;
                    })
                )
            }else{
                const taskData = {
                    id : new Date().getTime().toString(),
                    date : moment().format("DD-MM-YYYY hh:mm:ss"),
                    task_name : taskname.trim()
                }
    
                setMytasks([...mytasks, taskData]);
            }
            
            setTaskname("");    
            inputRef.current.select();
        } else {
            alert("enter task name")
        }
    }

    const deleteTask = (index) => {
        const updatedItems = mytasks.filter( (currEle) => {
            return currEle.id !== index
        });

        setMytasks(updatedItems);
    };

    const editTask = (index) => {
        const edit_my_task = mytasks.find( (currEle) => {
            return currEle.id === index;
        })
        setEditTaskData(edit_my_task);
       setTaskname(edit_my_task.task_name)
    }

    useEffect( () => {
        console.log("useEffect Called")
        localStorage.setItem("myTaskLists",JSON.stringify(mytasks))
    },[mytasks])

    return (
        <>
            <div className="container">
                <h2 className="text-center text-primary">My Task List</h2>
                <div className="row">
                <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name="task_name"autoFocus ref={inputRef} id="task_name" className="form-control" value={taskname} onChange={(event) => setTaskname(event.target.value)} />
                    </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={addTask}><i className="fa fa-plus"></i> Add Task</button>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'20px'}}>
                    <div className="col-md-12 mt-10">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-sm-4">Created Date</th>
                                    <th className="col-sm-6">Task Name</th>
                                    <th className="col-sm-2" style={{'textAlign':'center'}}>Action</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                {
                                mytasks.length > 0
                                ?
                                mytasks.map((currEle, index) => {
                                    return (
                                        <tr key={index}>
                                        <td>{currEle.date}</td>
                                        <td>{currEle.task_name}</td>
                                        <td style={{"textAlign":"center"}}>
                                            <button className="btn btn-sm btn-success" onClick={ () => editTask(currEle.id) }><i className="fa fa-pencil"></i> Edit</button>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-sm btn-danger" onClick={ () => deleteTask(currEle.id) }><i className='fa fa-trash'></i> Delete</button>    
                                        </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={3}  >No any task yet...</td>
                                </tr>
                                }
                                    
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Todo;