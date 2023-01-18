import {useRouter} from 'next/router'
import sidePanelStyles from '../../../styles/dashboard/side-panel.module.sass'
import {Home, Star, Archive, Create} from '../../images'

export default ({auth, todoListPopup, listPopup, starredPopup, archivedPopup}) => {
    const router = useRouter()

    const handleOpenList = (list) => {
        listPopup.current.show({
            id: list._id,
            ...list,
        })
    }

    return (
        <div className={sidePanelStyles.lists}>
            <ul>
                <li onClick={() => router.push('/dashboard')}>
                    <div className={sidePanelStyles.icon}>
                        <Home/>
                    </div>
                    <div className={sidePanelStyles.name}>Home</div>
                </li>
                <li onClick={() => starredPopup.current.show()}>
                    <div className={sidePanelStyles.icon}>
                        <Star/>
                    </div>
                    <div className={sidePanelStyles.name}>Starred</div>
                </li>
                <li onClick={() => archivedPopup.current.show()}>
                    <div className={sidePanelStyles.icon}>
                        <Archive/>
                    </div>
                    <div className={sidePanelStyles.name}>Archived</div>
                </li>
                <li onClick={() => todoListPopup.current.show({})}>
                    <div className={sidePanelStyles.icon}>
                        <Create/>
                    </div>
                    <div className={sidePanelStyles.name}>Create Todo</div>
                </li>
                {
                    auth.lists?.filter((list) =>  !list.archive).length ? (
                        <div className={sidePanelStyles.separator}></div>
                    ) : ''
                }
                {
                    auth.lists?.filter((list) =>  !list.archive).map((list) => {
                        const completed = list.todos.length && !list.todos.filter((t) => !t.completed).length

                        return (
                            <li key={list._id} className={`${completed ? sidePanelStyles.completed : ''}`} onClick={() => handleOpenList(list)}>
                                <div className={sidePanelStyles.icon_circle}>
                                    <div className={sidePanelStyles.circle}>
                                    </div>
                                </div>
                                <div className={sidePanelStyles.name}>{list.title}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}