-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "issues_issues" (
    "issue_id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "bim360_project_id" varchar(60)    ,
    "display_id" BIGINT    ,
    "title" varchar(2000)    ,
    "description" varchar(2000)    ,
    "type_id" varchar(60)    ,
    "subtype_id" varchar(60)    ,
    "status" varchar(30)    ,
    "assignee_id" varchar(30)    ,
    "assignee_type" varchar(30)    ,
    "due_date" varchar(90)    ,
    "location_id" varchar(60)    ,
    "location_details" varchar(2000)    ,
    "linked_document_urn" varchar(60)    ,
    "owner_id" varchar(30)    ,
    "root_cause_id" varchar(60)    ,
    "root_cause_category_id" varchar(60)    ,
    "response" varchar(2000)    ,
    "response_by" varchar(30)    ,
    "response_at" varchar(90)    ,
    "opened_by" varchar(30)    ,
    "opened_at" varchar(90)    ,
    "closed_by" varchar(30)    ,
    "closed_at" varchar(90)    ,
    "created_by" varchar(30)    ,
    "created_at" varchar(90)    ,
    "updated_by" varchar(30)    ,
    "updated_at" varchar(90)    ,
    CONSTRAINT "pk_issues_issues" PRIMARY KEY (
        "issue_id"
     )
);

CREATE TABLE "issues_issue_types" (
    "issue_type_id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "bim360_project_id" varchar(60)    ,
    "issue_type" varchar(60)    ,
    "is_active" varchar(30)    ,
    "created_by" varchar(60)    ,
    "created_at" varchar(90)    ,
    "updated_by" varchar(30)    ,
    "updated_at" varchar(90)    ,
    "deleted_by" varchar(60)    ,
    "deleted_at" varchar(90)    ,
    CONSTRAINT "pk_issues_issue_types" PRIMARY KEY (
        "issue_type_id"
     )
);



CREATE TABLE "admin_projects" (
    "id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "name" varchar(60)    ,
    "start_date" varchar(90)    ,
    "end_date" varchar(90)    ,
    "type" varchar(60)    ,
    "value" BIGINT    ,
    "currency" varchar(60)    ,
    "status" varchar(60)    ,
    "job_number" varchar(60)    ,
    "address_line1" varchar(90)    ,
    "address_line2" varchar(90)    ,
    "city" varchar(60)    ,
    "state_or_province" varchar(60)    ,
    "postal_code" varchar(60)    ,
    "country" varchar(60)    ,
    "timezone" varchar(60)    ,
    "construction_type" varchar(60)    ,
    "contract_type" varchar(60)    ,
    "business_unit_id" varchar(60)    ,
    "last_sign_in" varchar(90)    ,
    "created_at" varchar(90)    ,
    CONSTRAINT "pk_admin_projects" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "issues_issue_subtypes" (
    "issue_subtype_id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "bim360_project_id" varchar(60)    ,
    "issue_type_id" varchar(60)    ,
    "issue_subtype" varchar(60)    ,
    "is_active" varchar(30)    ,
    "created_by" varchar(30)    ,
    "created_at" varchar(90)    ,
    "updated_by" varchar(30)    ,
    "updated_at" varchar(90)    ,
    "deleted_by" varchar(60)    ,
    "deleted_at" varchar(90)    ,
    CONSTRAINT "pk_issues_issue_subtypes" PRIMARY KEY (
        "issue_subtype_id"
     )
);

CREATE TABLE "zips" (
    "zip" varchar(60)   NOT NULL,
    "latitude" double precision   NOT NULL,
    "longitude" double precision   NOT NULL,
    "city" varchar(60),
    "state" varchar(60),
    "county" varchar(60),
    "other_info" varchar(60),
    CONSTRAINT "pk_zips" PRIMARY KEY (
        "zip"
     )
);

CREATE TABLE "issues_with_projects" (  
    "id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "name" varchar(60)    ,
    "start_date" varchar(90)    ,
    "end_date" varchar(90)    ,
    "type" varchar(60)    ,
    "value" BIGINT    ,
    "currency" varchar(60)    ,
    "project_status" varchar(60)    ,
    "job_number" varchar(60)    ,
    "address_line1" varchar(90)    ,
    "address_line2" varchar(90)    ,
    "city" varchar(60)    ,
    "state_or_province" varchar(60)    ,
    "postal_code" varchar(60)    ,
    "country" varchar(60)    ,
    "timezone" varchar(60)    ,
    "construction_type" varchar(60)    ,
    "contract_type" varchar(60)    ,
    "business_unit_id" varchar(60)    ,
    "last_sign_in" varchar(90)    ,
    "project_created_at" varchar(90)    ,  

    "issue_id" varchar(60)    NOT NULL,
    "bim360_project_id" varchar(60)    ,
    "display_id" BIGINT    ,
    "title" varchar(2000)    ,
    "description" varchar(2000)    ,
    "type_id" varchar(60)    ,
    "subtype_id" varchar(60)    ,
    "issue_status" varchar(30)    ,
    "assignee_id" varchar(30)    ,
    "assignee_type" varchar(30)    ,
    "due_date" varchar(90)    ,
    "location_id" varchar(60)    ,
    "location_details" varchar(2000)    ,
    "linked_document_urn" varchar(60)    ,
    "owner_id" varchar(30)    ,
    "root_cause_id" varchar(60)    ,
    "root_cause_category_id" varchar(60)    ,
    "response" varchar(2000)    ,
    "response_by" varchar(30)    ,
    "response_at" varchar(90)    ,
    "opened_by" varchar(30)    ,
    "opened_at" varchar(90)    ,
    "closed_by" varchar(30)    ,
    "closed_at" varchar(90)    ,
    "created_by" varchar(30)    ,
    "issue_created_at" varchar(90)    ,
    "updated_by" varchar(30)    ,
    "updated_at" varchar(90)    ,
    CONSTRAINT "pk_issues_with_projects" PRIMARY KEY (
        "issue_id"
     )
);

CREATE TABLE "master_table" (
    "issue_type_ssue_type_id" varchar(60)    NOT NULL,    
    "issue_type_issue_type" varchar(60)    ,
    "issue_type_is_active" varchar(30)    ,
    "issue_type_created_by" varchar(60)    ,
    "issue_type_created_at" varchar(90)    ,
    "issue_type_updated_by" varchar(30)    ,
    "issue_type_updated_at" varchar(90)    ,
    "issue_type_deleted_by" varchar(60)    ,
    "issue_type_deleted_at" varchar(90)    ,
  
    "id" varchar(60)    NOT NULL,
    "bim360_account_id" varchar(60)    ,
    "name" varchar(60)    ,
    "start_date" varchar(90)    ,
    "end_date" varchar(90)    ,
    "type" varchar(60)    ,
    "value" BIGINT    ,
    "currency" varchar(60)    ,
    "project_status" varchar(60)    ,
    "job_number" varchar(60)    ,
    "address_line1" varchar(90)    ,
    "address_line2" varchar(90)    ,
    "city" varchar(60)    ,
    "state_or_province" varchar(60)    ,
    "postal_code" varchar(60)    ,
    "country" varchar(60)    ,
    "timezone" varchar(60)    ,
    "construction_type" varchar(60)    ,
    "contract_type" varchar(60)    ,
    "business_unit_id" varchar(60)    ,
    "last_sign_in" varchar(90)    ,
    "project_created_at" varchar(90)    ,  

    "issue_id" varchar(60)    NOT NULL,    
    "bim360_project_id" varchar(60)    ,
    "display_id" BIGINT    ,
    "title" varchar(2000)    ,
    "description" varchar(2000)    ,
    "type_id" varchar(60)    ,
    "subtype_id" varchar(60)    ,
    "issue_status" varchar(30)    ,
    "assignee_id" varchar(30)    ,
    "assignee_type" varchar(30)    ,
    "due_date" varchar(90)    ,
    "location_id" varchar(60)    ,
    "location_details" varchar(2000)    ,
    "linked_document_urn" varchar(60)    ,
    "owner_id" varchar(30)    ,
    "root_cause_id" varchar(60)    ,
    "root_cause_category_id" varchar(60)    ,
    "response" varchar(2000)    ,
    "response_by" varchar(30)    ,
    "response_at" varchar(90)    ,
    "opened_by" varchar(30)    ,
    "opened_at" varchar(90)    ,
    "closed_by" varchar(30)    ,
    "closed_at" varchar(90)    ,
    "created_by" varchar(30)    ,
    "issue_created_at" varchar(90)    ,
    "updated_by" varchar(30)    ,
    "updated_at" varchar(90)    ,
  
    CONSTRAINT "pk_master_table" PRIMARY KEY (
        "issue_id"
     )
);



-- important note: these foreign keys are a good idea but had some issues with FOREIGN KEY CONSTRAINT violations when loading data... missing keys in some tables. so it may be best to run schema without the constraints listed below 

-- also zip foreign key needed still if adding this




ALTER TABLE "issues_issues" ADD CONSTRAINT "fk_issues_issues_type_id" FOREIGN KEY("type_id")
REFERENCES "issues_issue_types" ("issue_type_id");

ALTER TABLE "issues_issues" ADD CONSTRAINT "fk_issues_issues_subtype_id" FOREIGN KEY("subtype_id")
REFERENCES "issues_issue_subtypes" ("issue_subtype_id");

ALTER TABLE "issues_issue_types" ADD CONSTRAINT "fk_issues_issue_types_bim360_project_id" FOREIGN KEY("bim360_project_id")
REFERENCES "admin_projects" ("id");



ALTER TABLE "issues_issue_subtypes" ADD CONSTRAINT "fk_issues_issue_subtypes_issue_type_id" FOREIGN KEY("issue_type_id")
REFERENCES "issues_issue_types" ("issue_type_id");

