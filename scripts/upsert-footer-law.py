# -*- coding: utf-8 -*-
import sqlite3
import sys
import time

DB = "/var/www/azotrostovskiy.ru/backend/backend/prisma/dev.db"
TEXT = (
    "Федеральный закон «Об ограничении оборота закиси азота в РФ» от 29.12.2020 N 472-ФЗ"
)
URL = "https://www.consultant.ru/document/cons_doc_LAW_372637/"

now = int(time.time() * 1000)
rows = [
    ("footer_law_link_text", TEXT, "text", "global", "footer", "ФЗ — текст ссылки"),
    ("footer_law_link_url", URL, "text", "global", "footer", "ФЗ — URL ссылки (абсолютный)"),
]

con = sqlite3.connect(DB)
cur = con.cursor()
for key, val, typ, page, block, label in rows:
    cur.execute("SELECT id FROM content_blocks WHERE key=?", (key,))
    if cur.fetchone():
        cur.execute(
            "UPDATE content_blocks SET value=?, type=?, page=?, block=?, label=?, updated_at=? WHERE key=?",
            (val, typ, page, block, label, now, key),
        )
        print("updated", key)
    else:
        cur.execute(
            "INSERT INTO content_blocks (key,value,type,created_at,updated_at,page,block,label) VALUES (?,?,?,?,?,?,?,?)",
            (key, val, typ, now, now, page, block, label),
        )
        print("inserted", key)
con.commit()
cur.execute(
    "SELECT key, value FROM content_blocks WHERE key IN ('footer_law_link_text','footer_law_link_url')"
)
for r in cur.fetchall():
    print(r[0], "=>", r[1][:80] + ("..." if len(r[1]) > 80 else ""))
con.close()
sys.exit(0)
