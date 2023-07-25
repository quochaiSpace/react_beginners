import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../Service/UserService'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsModalEditUser] = useState(false);
    const [isShowModalDeleteUser, setIsModalDeleteUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataDeleteUser, setDataDeleteUser] = useState({})

    const handleClose = () => {
        setIsModalAddNew(false);
        setIsModalEditUser(false);
        setIsModalDeleteUser(false)

    }


    useEffect(() => {
        //call API
        getUser(1)
    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUsers(page);

        if (res && res.data && res.data) {
            setTotal(res.total);
            setListUser(res.data);

            setTotalPages(res.total_pages)

        }
    }

    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
    }

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }

    const handleEditUser = (user) => {
        setIsModalEditUser(true)
        setDataUserEdit(user)
    }

    const handleDeleteUser = (user) => {
        setIsModalDeleteUser(true);
        setDataDeleteUser(user)


    }

    //_.cloneDeep: thư viện lodash
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUser(cloneListUsers)

    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUser(cloneListUsers);
    }

    return (


        <>
            <div className='add-new'>
                <span> <b>List User :</b> </span>
                <button onClick={() => setIsModalAddNew(true)}
                    className='btn btn-success'>Add new user

                </button>
            </div>

            <Table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0
                        && listUser.map((item, index) => {
                            return (
                                <tr key={`user${index}`}>
                                    <td> {item.id} </td>
                                    <td> {item.first_name} </td>
                                    <td> {item.last_name} </td>
                                    <td> {item.email} </td>

                                    <td>
                                        <button onClick={() => handleEditUser(item)}
                                            className='btn btn-warning mx-3'>Edit</button>
                                        <button onClick={() => handleDeleteUser(item)}
                                            className='btn btn-danger'>Delete</button>

                                    </td>
                                </tr>

                            )
                        })
                    }
                </tbody>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"

                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
            </Table>

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDeleteUser}
                handleClose={handleClose}
                dataDeleteUser={dataDeleteUser}
                handleDeleteUserFromModal={handleDeleteUserFromModal}

            />
        </>

    )
}

export default TableUsers;