import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { deleteUser } from '../Service/UserService'
import { toast } from "react-toastify";


const ModalConfirm = (props) => {
    const { show, handleClose, dataDeleteUser, handleDeleteUserFromModal } = props;


    const confirmDelete = async () => {
        let res = await deleteUser(dataDeleteUser.id);

        if (res && res.statusCode === 204) {
            //success
            toast.success("Delete Success!");

            handleClose();
            handleDeleteUserFromModal(dataDeleteUser)
        }
        console.log(">>check res: ", res);
    }

    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete A Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Are you sure you want to delete?</span>
                    <h5>Mail = {dataDeleteUser.email} </h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;