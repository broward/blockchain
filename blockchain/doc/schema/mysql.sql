/* blockchain database for bitcoin */
/* tested on mysql ver 5.6 */
/* tested on postgres 9.4 */
/* broward horne, Sept 24, 2015 */


DROP TABLE pubkey;
DROP TABLE txout;
DROP TABLE block_next;
DROP TABLE orphan_block;
DROP TABLE chain_candidate;
DROP TABLE unlinked_txin;
DROP TABLE block_txin;
DROP TABLE txin;
DROP TABLE block_tx;
DROP TABLE tx;
DROP TABLE chain;
DROP TABLE magic;
DROP TABLE policy;
DROP TABLE block;

CREATE TABLE block (
    block_id DECIMAL(14),
    block_hash CHAR(64),
    block_version DECIMAL(10),
    block_hashMerkleRoot CHAR(64),
    block_nTime DECIMAL(20),
    block_nBits DECIMAL(10),
    block_nNonce DECIMAL(10),
    block_height DECIMAL(14),
    prev_block_id DECIMAL(14),
    block_chain_work CHAR(76),
    block_value_in DECIMAL(30),
    block_value_out DECIMAL(30),
    block_total_satoshis DECIMAL(26),
    block_total_seconds DECIMAL(20),
    block_satoshi_seconds DECIMAL(28),
    block_total_ss DECIMAL(28),
    block_num_tx DECIMAL(10),
    block_ss_destroyed DECIMAL(28)
);


CREATE TABLE block_next (
    block_id DECIMAL(14),
    next_block_id DECIMAL(14)
);


CREATE TABLE orphan_block (
    block_id DECIMAL(14),
    block_hashPrev CHAR(64)
);


CREATE TABLE block_tx (
    block_id DECIMAL(14),
    tx_id DECIMAL(26),
    tx_pos DECIMAL(10),
    satosh_seconds_destroyed DECIMAL(28)
);


CREATE TABLE block_txin (
    block_id DECIMAL(14),
    txin_id DECIMAL(26),
    out_block_id DECIMAL(14)
);


CREATE TABLE unlinked_txin (
    txin_id DECIMAL(26),
    txout_tx_hash CHAR(64),
    txout_pos DECIMAL(10)
);


CREATE TABLE txin (
    txin_id DECIMAL(26),
    tx_id DECIMAL(26),
    txin_id_pos DECIMAL(10),
    txout_id DECIMAL(26),
    txout_scriptSig VARCHAR(20000),
    txin_sequence DECIMAL(10)
);


CREATE TABLE magic (
    magic_id DECIMAL(10),
    magic CHAR(8),
    magic_name VARCHAR(100)
);


CREATE TABLE policy (
    policy_id DECIMAL(10),
    policy_name VARCHAR(100)
);


CREATE TABLE chain_candidate (
    chain_id DECIMAL(10),
    block_id DECIMAL(14),
    in_longest DECIMAL(1),
    block_height DECIMAL(14)
);


CREATE TABLE tx (
    tx_id DECIMAL(26),
    tx_hash VARCHAR(64),
    tx_version DECIMAL(10),
    tx_lockTime DECIMAL(10),
    tx_size DECIMAL(10)
);


CREATE TABLE pubkey (
    pubkey_id DECIMAL(26),
    pubkey_hash CHAR(40),
    pubkey CHAR(130)
);


CREATE TABLE chain (
    chain_id DECIMAL(10),
    magic_id DECIMAL(10),
    policy_id DECIMAL(10),
    chain_name VARCHAR(100),
    chain_code3 CHAR(3),
    chain_address_version VARCHAR(200),
    chain_last_block_id DECIMAL(14)
);


CREATE TABLE txout (
    txout_id DECIMAL(26),
    tx_id DECIMAL(26),
    tx_out_pos DECIMAL(10),
    tx_out_value DECIMAL(30),
    txout_scriptPubKey VARCHAR(20000),
    pubkey_id DECIMAL(26)
);


/* add primary keys */

ALTER TABLE block
    ADD CONSTRAINT pk_1 PRIMARY KEY (block_id);    
ALTER TABLE magic
    ADD CONSTRAINT pk_2 PRIMARY KEY (magic_id);
ALTER TABLE policy
    ADD CONSTRAINT pk_3 PRIMARY KEY (policy_id);
ALTER TABLE tx
    ADD CONSTRAINT pk_4 PRIMARY KEY (tx_id);
ALTER TABLE txin
    ADD CONSTRAINT pk_5 PRIMARY KEY (txin_id);
ALTER TABLE pubkey
    ADD CONSTRAINT pk_6 PRIMARY KEY (pubkey_id);
ALTER TABLE chain
    ADD CONSTRAINT pk_7 PRIMARY KEY (chain_id);
ALTER TABLE txout
    ADD CONSTRAINT pk_8 PRIMARY KEY (txout_id);
ALTER TABLE block_next
    ADD CONSTRAINT pk_9 PRIMARY KEY (block_id, next_block_id);
ALTER TABLE block_tx
    ADD CONSTRAINT pk_10 PRIMARY KEY (block_id, tx_id);
ALTER TABLE block_txin
    ADD CONSTRAINT pk_11 PRIMARY KEY (block_id, txin_id);
ALTER TABLE chain_candidate
    ADD CONSTRAINT pk_12 PRIMARY KEY (chain_id, block_id);


/* ADD CONSTRAINT FOREIGN KEYs */

ALTER TABLE block_next
    ADD CONSTRAINT fk_1 FOREIGN KEY (block_id) REFERENCES block(block_id);
ALTER TABLE block_next
    ADD CONSTRAINT fk_2 FOREIGN KEY (next_block_id) REFERENCES block(block_id);

ALTER TABLE orphan_block
    ADD CONSTRAINT fk_3 FOREIGN KEY (block_id) REFERENCES block(block_id);

ALTER TABLE block_tx
    ADD CONSTRAINT fk_4 FOREIGN KEY (block_id) REFERENCES block(block_id);
ALTER TABLE block_tx
    ADD CONSTRAINT fk_5 FOREIGN KEY (tx_id) REFERENCES tx(tx_id);

ALTER TABLE txin
    ADD CONSTRAINT fk_6 FOREIGN KEY (tx_id) REFERENCES tx(tx_id);

ALTER TABLE block_txin
    ADD CONSTRAINT fk_7 FOREIGN KEY (block_id) REFERENCES block(block_id);
    
ALTER TABLE block_txin
    ADD CONSTRAINT fk_8 FOREIGN KEY (out_block_id) REFERENCES block(block_id);
ALTER TABLE block_txin
    ADD CONSTRAINT fk_9 FOREIGN KEY (txin_id) REFERENCES txin(txin_id);

ALTER TABLE unlinked_txin
    ADD CONSTRAINT fk_10 FOREIGN KEY (txin_id) REFERENCES txin(txin_id);
ALTER TABLE chain_candidate
    ADD CONSTRAINT fk_11 FOREIGN KEY (block_id) REFERENCES block(block_id);

ALTER TABLE chain
    ADD CONSTRAINT fk_12 FOREIGN KEY (chain_last_block_id) REFERENCES block(block_id);
ALTER TABLE chain
    ADD CONSTRAINT fk_13 FOREIGN KEY (magic_id) REFERENCES magic(magic_id);
ALTER TABLE chain
    ADD CONSTRAINT fk_14 FOREIGN KEY (policy_id) REFERENCES policy(policy_id);

ALTER TABLE block
    ADD CONSTRAINT fk_15 FOREIGN KEY (prev_block_id) REFERENCES block(block_id);




