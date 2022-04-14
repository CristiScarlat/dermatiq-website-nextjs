

const Form = ({ className, submitButtonDisabled }) => {
    return (
        <form className={`row g-3 ${className}`}>
            <div className="col-md-6">
                <label htmlFor="form-name" className="form-label">Nume</label>
                <input type="text" className="form-control" id="form-name"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="form-surname" className="form-label">Prenume</label>
                <input type="text" className="form-control" id="form-surname"/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputAddress" placeholder="example@email.com"/>
            </div>
            {/* <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" className="form-control" id="inputCity"/>
            </div>
            <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">State</label>
                <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="inputZip"/>
            </div> */}
            {/* <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            Check me out
                        </label>
                </div>
            </div> */}
            <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={submitButtonDisabled}>Submit</button>
            </div>
        </form>
    )
}

export default Form;