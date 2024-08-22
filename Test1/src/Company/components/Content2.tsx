import React from 'react';

const Content2: React.FC = () => {
    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper container-xxl p-0">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    {/* Users list start */}
                    <section className="app-user-list">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="fw-bolder mb-75">21,459</h3>
                                            <span>Total Users</span>
                                        </div>
                                        <div className="avatar bg-light-primary p-50">
                                            <span className="avatar-content">
                                                <i className="font-medium-4" data-feather="user"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="fw-bolder mb-75">4,567</h3>
                                            <span>Paid Users</span>
                                        </div>
                                        <div className="avatar bg-light-danger p-50">
                                            <span className="avatar-content">
                                                <i className="font-medium-4" data-feather="user-plus"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="fw-bolder mb-75">19,860</h3>
                                            <span>Active Users</span>
                                        </div>
                                        <div className="avatar bg-light-success p-50">
                                            <span className="avatar-content">
                                                <i className="font-medium-4" data-feather="user-check"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="fw-bolder mb-75">237</h3>
                                            <span>Pending Users</span>
                                        </div>
                                        <div className="avatar bg-light-warning p-50">
                                            <span className="avatar-content">
                                                <i className="font-medium-4" data-feather="user-x"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* List and filter start */}
                        <div className="card">
                            <div className="card-body border-bottom">
                                <h4 className="card-title">Search & Filter</h4>
                                <div className="row">
                                    <div className="col-md-4 user_role"></div>
                                    <div className="col-md-4 user_plan"></div>
                                    <div className="col-md-4 user_status"></div>
                                </div>
                            </div>
                            <div className="card-datatable table-responsive pt-0">
                                <table className="user-list-table table">
                                    <thead className="table-light">
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Plan</th>
                                            <th>Billing</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            {/* Modal to add new user */}
                            <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-in">
                                <div className="modal-dialog">
                                    <form className="add-new-user modal-content pt-0">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
                                        <div className="modal-header mb-1">
                                            <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                                        </div>
                                        <div className="modal-body flex-grow-1">
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="basic-icon-default-fullname">Full Name</label>
                                                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="John Doe" name="user-fullname" />
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="basic-icon-default-uname">Username</label>
                                                <input type="text" id="basic-icon-default-uname" className="form-control dt-uname" placeholder="Web Developer" name="user-name" />
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="basic-icon-default-email">Email</label>
                                                <input type="text" id="basic-icon-default-email" className="form-control dt-email" placeholder="john.doe@example.com" name="user-email" />
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="basic-icon-default-contact">Contact</label>
                                                <input type="text" id="basic-icon-default-contact" className="form-control dt-contact" placeholder="+1 (609) 933-44-22" name="user-contact" />
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="basic-icon-default-company">Company</label>
                                                <input type="text" id="basic-icon-default-company" className="form-control dt-contact" placeholder="PIXINVENT" name="user-company" />
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="country">Country</label>
                                                <select id="country" className="select2 form-select">
                                                    <option value="United States">United States</option>
                                                    {/* Other country options */}
                                                </select>
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label" htmlFor="user-role">User Role</label>
                                                <select id="user-role" className="select2 form-select">
                                                    <option value="subscriber">Subscriber</option>
                                                    <option value="editor">Editor</option>
                                                    <option value="maintainer">Maintainer</option>
                                                    <option value="author">Author</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" htmlFor="user-plan">Select Plan</label>
                                                <select id="user-plan" className="select2 form-select">
                                                    <option value="basic">Basic</option>
                                                    <option value="enterprise">Enterprise</option>
                                                    <option value="company">Company</option>
                                                    <option value="team">Team</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary me-1 data-submit">Submit</button>
                                            <button type="reset" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* Modal ends */}
                        </div>
                        {/* List and filter end */}
                    </section>
                    {/* Users list ends */}
                </div>
            </div>
        </div>
    );
};

export default Content2;