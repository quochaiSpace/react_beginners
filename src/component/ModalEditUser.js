import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { putUpdateUser } from '../Service/UserService'
import { toast } from "react-toastify";


const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt)
            //success
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })

        handleClose()
        toast.success("Success")
        console.log(res)
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit A Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Job</label>
                            <input type="text" class="form-control" id="exampleInputPassword1"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;