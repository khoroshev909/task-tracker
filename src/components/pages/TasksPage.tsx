import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/20/solid";
import ReactPaginate from 'react-paginate';
import Sidebar from "../ui/sidebar/Sidebar";
import _ from 'lodash'
import Search from "../ui/Search";
import {IQueryParams} from "../../types/other";
import {taskHideFinished, taskShowFinished, tasksRemoveFilter} from "../../store/task/taskSlice";
import {localStorageService} from "../../services/localstorage.service";
import CheckboxHideFinished from "../ui/CheckboxHideFinished";
import {NavigationContext} from "../ui/navbar/Navbar";
import {searchTasks} from "../../store/task/taskActions";
import query from 'query-string'
import qetParamsString from '../../utiils/getParamsString'
import {ITask} from "../../types/task";
import TaskList from "../task/TaskList";

export const TaskListContext = createContext<{ setFirstPage: () => void }>({setFirstPage: null})

const TasksPage = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()
    const queryParams = query.parse(useLocation().search)
    const perPageRef = useRef<number>(5)
    const {page}: IQueryParams = queryParams
    const {tasks, filter} = useAppSelector(state => state.tasks)
    const pageCount = Math.ceil(tasks?.length / perPageRef.current)
    const [tasksChunk, setTasksChunk] = useState<ITask[][]>([])
    const [pageIdx, setPageIdx] = useState<number>(
        !page || isNaN(Number(page)) || Number(page) === 0 ?
                    0 :
                    Number(page) - 1
        )
    const { setFirstPage } = useContext(NavigationContext)
    const [isHideFinished, setIsHideFinished] = useState<boolean>(
        localStorageService.getIsHideFinished() !== undefined ?
            localStorageService.getIsHideFinished() :
            false
    )
    const [search, setSearch] = useState<string>('')
    const isShowTasks = tasks.length && tasksChunk.length && tasksChunk.length - 1 >= pageIdx
    const isShowPaginate = tasks && tasks.length > perPageRef.current

    useEffect(() => {
        if (tasksChunk.length && pageIdx + 1 > tasksChunk.length) {
            setPageIdx(tasksChunk.length - 1)
        }
    }, [tasksChunk])


    useEffect(() => {
        if (tasks.length) {
            setTasksChunk(_.chunk( _.orderBy(tasks, ['created_at'], ['desc']) , perPageRef.current))
        }
    }, [tasks])

    useEffect(() => {
        if (filter) {
            setIsHideFinished(false)
            localStorageService.setIsHideFinishedTasks(false)
        }
    }, [filter])

    useEffect(() => {
        if (setFirstPage.value) {
            setPageIdx(0)
            setSearch('')
            setFirstPage.value = false
        }
    }, [setFirstPage.value])

    useEffect(() => {
        if (search) startSearching()
    }, [search])

    function startSearching() {
        if (isHideFinished) {
            setIsHideFinished(false)
            localStorageService.setIsHideFinishedTasks(false)
        }
        if (filter) {
            dispatch(tasksRemoveFilter())
        }
        if (pageIdx !== 0) {
            history.push('/')
            setPageIdx(0)
        }
    }

    const changePageHandler = (selectedItem: { selected: number; }) => {
        setPageIdx(selectedItem.selected)
        const params = { ...queryParams, page: (selectedItem.selected + 1).toString() }
        history.push(`/` + qetParamsString(params))
    }

    const toggleHideFinishedHandler = () => {
        setPageIdx(0)
        if (isHideFinished === false) {
            dispatch(taskHideFinished())
        } else {
            dispatch(taskShowFinished())
        }
        localStorageService.setIsHideFinishedTasks(!isHideFinished)
        setIsHideFinished(prev => !prev)
    }

    const searchHandler = (value: string) => {
        setSearch(value)
        dispatch(searchTasks(value))
    }

    return (
        <>
            <div className="flex p-4">
               <div className="mr-3  w-[20%]">
                   <TaskListContext.Provider value={{ setFirstPage:() => setPageIdx(0) }} >
                       <Sidebar />
                   </TaskListContext.Provider>
               </div>

                <div className="w-[80%]">
                    <div className="flex items-center mb-1.5">
                        <Search
                            value={search}
                            onSearch={searchHandler}/>

                        <CheckboxHideFinished
                            id="finished-tasks"
                            checked={isHideFinished}
                            search={search}
                            label="Скрыть завершённые"
                            onCheck={toggleHideFinishedHandler}/>
                    </div>

                    <TaskList
                        isShowTasks={isShowTasks}
                        tasksChunk={tasksChunk}
                        pageIdx={pageIdx}
                        search={search} />

                    {isShowPaginate && (
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<ArrowRightIcon className="h-4 w-4 ml-1 text-slate-500" />}
                            onPageChange={changePageHandler}
                            pageRangeDisplayed={2}
                            forcePage={pageIdx > pageCount - 1 ? pageCount - 1 : pageIdx}
                            pageCount={pageCount}
                            previousLabel={<ArrowLeftIcon className="h-4 w-4 mr-1 text-slate-500" />}
                            containerClassName="flex justify-center items-center"
                            pageClassName="border px-3 py-1 mx-1 rounded-lg"
                            activeClassName="bg-gray-500 text-white rounded-lg px-4 py-2 mx-1"
                        />
                    )}
                </div>
            </div>
        </>

    );
}
 
export default TasksPage;