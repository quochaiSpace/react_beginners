import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../Service/UserService";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";

const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsModalEditUser] = useState(false);
    const [isShowModalDeleteUser, setIsModalDeleteUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataDeleteUser, setDataDeleteUser] = useState({});

    const handleClose = () => {
        setIsModalAddNew(false);
        setIsModalEditUser(false);
        setIsModalDeleteUser(false);
    };

    useEffect(() => {
        //call API
        getUser(1);
    }, []);

    const getUser = async (page) => {
        let res = await fetchAllUsers(page);

        if (res && res.data && res.data) {
            setTotal(res.total);
            setListUser(res.data);

            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUser(+event.selected + 1);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleEditUser = (user) => {
        setIsModalEditUser(true);
        setDataUserEdit(user);
    };

    const handleDeleteUser = (user) => {
        setIsModalDeleteUser(true);
        setDataDeleteUser(user);
    };

    //_.cloneDeep: thư viện lodash
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUser(cloneListUsers);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUser(cloneListUsers);
    };

    const handleSearch = debounce((event) => {
        console.log(event.target.value);
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUser);
            cloneListUsers = cloneListUsers.filter((item) =>
                item.email.includes(term)
            );
            setListUser(cloneListUsers);
        } else {
            getUser(1);
        }
    }, 500);

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"],
    ];

    return (
        <>
            <div className="my-3 add-new">
                <span>
                    {" "}
                    <b>List User :</b>{" "}
                </span>

                <div>
                    <label htmlFor="test" className="btn btn-warning">
                        Import
                    </label>
                    <input id="test" type="file" hidden></input>

                    <CSVLink
                        data={listUser}
                        filename={"User.csv"}
                        className="btn btn-primary"
                    >
                        Export
                    </CSVLink>
                </div>
                <button
                    onClick={() => setIsModalAddNew(true)}
                    className="btn btn-success"
                >
                    Add new user
                </button>
            </div>

            <div className="col-6 my-3">
                <input
                    placeholder="Search user by email"
                    onChange={(event) => handleSearch(event)}
                ></input>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`user${index}`}>
                                    <td> {item.id} </td>
                                    <td> {item.first_name} </td>
                                    <td> {item.last_name} </td>
                                    <td> {item.email} </td>

                                    <td>
                                        <button
                                            onClick={() => handleEditUser(item)}
                                            className="btn btn-warning mx-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(item)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
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
    );
};

export default TableUsers;
