# Sybase

Sybase is a relational database system and a typical large-scale database system for client/server environments on UNIX or Windows NT platforms.

## Configuration Instructions

* **Database Host and Port**: Ensure that you correctly fill in your database link and port.

* **User and Password**: When configuring the data source, fill in your account and password. The permission configuration example is as follows, assuming the account is `username`:

  ```sql
  sp_displaylogin username
  sp_role 'grant', sa_role, username
  sp_role 'grant', replication_role, username
  sp_role 'grant', sybase_ts_role, username
  ```

* **Getting Character Set**: Correct character set configuration can properly parse Traditional Chinese, Simplified Chinese text, and some special characters. Use the following method to query the character set settings:

  ```sql
  -- Execute the following SQL to get the value of the Run Value field
  sp_configure 'default character set id';
  
  -- Using the Run Value obtained from the previous step, execute the following SQL to get the corresponding character set
  select name, id from master..syscharsets where id = ${Run Value}
  ```