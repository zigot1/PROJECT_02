-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE issues_issues (
    issue_id varchar(60)   NOT NULL UNIQUE,
    bim360_account_id  varchar(60)   NOT NULL,
    bim360_project_id  varchar(60)   NOT NULL,
    display_id  int   NOT NULL,
    title  varchar(500)   NOT NULL,
    description  varchar(500)   NOT NULL,
    type_id  varchar(60)   NOT NULL UNIQUE,
    subtype_id  varchar(60)   NOT NULL UNIQUE,
    status  varchar(30)   NOT NULL,
    assignee_id  varchar(30)   NOT NULL,
    assignee_type  varchar(30)   NOT NULL,
    due_date  varchar(90)   NOT NULL,
    location_id  varchar(60)   NOT NULL,
    location_details  varchar(500)   NOT NULL,
    linked_document_urn  varchar(60)   NOT NULL,
    owner_id  varchar(30)   NOT NULL,
    root_cause_id  varchar(60)   NOT NULL,
     root_cause_category_id  varchar(60)   NOT NULL,
     response  varchar(500)   NOT NULL,
     response_by  varchar(30)   NOT NULL,
     response_at  varchar(90)   NOT NULL,
     opened_by  varchar(30)   NOT NULL,
     opened_at  varchar(90)   NOT NULL,
     closed_by  varchar(30)   NOT NULL,
     closed_at  varchar(90)   NOT NULL,
     created_by  varchar(30)   NOT NULL,
     created_at  varchar(90)   NOT NULL,
     updated_by  varchar(30)   NOT NULL,
     updated_at  varchar(90)   NOT NULL,
    CONSTRAINT  pk_issues_issues  PRIMARY KEY (
         issue_id 
     )
);

CREATE TABLE  issues_issue_types  (
     issue_type_id  varchar(60)   NOT NULL UNIQUE,
     bim360_account_id  varchar(60)   NOT NULL,
     bim360_project_id  varchar(60)   NOT NULL UNIQUE,
     issue_type  varchar(60)   NOT NULL,
     is_active  varchar(30)   NOT NULL,
     created_by  varchar(60)   NOT NULL,
     created_at  varchar(90)   NOT NULL,
     updated_by  varchar(30)   NOT NULL,
     updated_at  varchar(90)   NOT NULL,
     deleted_by  varchar(60)   NOT NULL,
     deleted_at  varchar(90)   NOT NULL,
    CONSTRAINT  pk_issues_issue_types  PRIMARY KEY (
         issue_type_id 
     )
);

CREATE TABLE  admin_project_services  (
     project_id  varchar(60)   NOT NULL,
     bim360_account_id  varchar(60)   NOT NULL,
     service  varchar(30)   NOT NULL,
    CONSTRAINT  pk_admin_project_services  PRIMARY KEY (
         project_id, service
     )
);

CREATE TABLE  admin_projects  (
     id  varchar(60)   NOT NULL UNIQUE,
     bim360_account_id  varchar(60)   NOT NULL,
     name  varchar(60)   NOT NULL,
     start_date  varchar(90)   NOT NULL,
     end_date  varchar(90)   NOT NULL,
     type  varchar(60)   NOT NULL,
     value  int   NOT NULL,
     currency  varchar(60)   NOT NULL,
     status  varchar(60)   NOT NULL,
     job_number  varchar(60)   NOT NULL,
     address_line1  varchar(90)   NOT NULL,
     address_line2  varchar(90)   NOT NULL,
     city  varchar(60)   NOT NULL,
     state_or_province  varchar(60)   NOT NULL,
     postal_code  varchar(60)   NOT NULL,
     country  varchar(60)   NOT NULL,
     timezone  varchar(60)   NOT NULL,
     construction_type  varchar(60)   NOT NULL,
     contract_type  varchar(60)   NOT NULL,
     business_unit_id  varchar(60)   NOT NULL,
     last_sign_in  varchar(90)   NOT NULL,
     created_at  varchar(90)   NOT NULL,
    CONSTRAINT  pk_admin_projects  PRIMARY KEY (
         id 
     )
);

CREATE TABLE  issues_issues_subtypes  (
     issue_subtype_id  varchar(60)   NOT NULL UNIQUE,
     bim360_account_id  varchar(60)   NOT NULL,
     bim360_project_id  varchar(60)   NOT NULL,
     issue_type_id  varchar(60)   NOT NULL UNIQUE,
     issue_subtype  varchar(60)   NOT NULL,
     is_active  varchar(30)   NOT NULL,
     created_by  varchar(30)   NOT NULL,
     created_at  varchar(90)   NOT NULL,
     updated_by  varchar(30)   NOT NULL,
     updated_at  varchar(90)   NOT NULL,
     deleted_by  varchar(60)   NOT NULL,
     deleted_at  varchar(90)   NOT NULL,
    CONSTRAINT  pk_issues_issues_subtypes  PRIMARY KEY (
         issue_subtype_id 
     )
);

ALTER TABLE  issues_issues  ADD CONSTRAINT  fk_issues_issues_type_id  FOREIGN KEY( type_id )
REFERENCES  issues_issue_types  ( issue_type_id );

ALTER TABLE  issues_issues  ADD CONSTRAINT  fk_issues_issues_subtype_id  FOREIGN KEY( subtype_id )
REFERENCES  issues_issues_subtypes  ( issue_subtype_id );

ALTER TABLE  issues_issue_types  ADD CONSTRAINT  fk_issues_issue_types_issue_type_id  FOREIGN KEY( issue_type_id )
REFERENCES  issues_issues_subtypes  ( issue_type_id );

ALTER TABLE  admin_project_services  ADD CONSTRAINT  fk_admin_project_services_project_id  FOREIGN KEY( project_id )
REFERENCES  issues_issue_types  ( bim360_project_id );

ALTER TABLE  admin_projects  ADD CONSTRAINT  fk_admin_projects_id  FOREIGN KEY( id )
REFERENCES  admin_project_services  ( project_id );