import re
import datetime
from typing import Dict, Any, List

class DocumentParser:
    """
    Parses multi-format documents (PDF, DOCX, TXT, Markdown, Code),
    extracting clean text, structural sections, and metadata.
    """
    def __init__(self):
        pass

    def parse(self, title: str, content: str, source_type: str = "txt", author: str = "Engineering Team", metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        meta = metadata or {}
        cleaned_text = self._clean_text(content)
        sections = self._extract_sections(content)
        code_blocks = self._extract_code_blocks(content)
        
        parsed_metadata = {
            "title": title,
            "source_type": source_type,
            "author": author,
            "parsed_at": datetime.datetime.utcnow().isoformat() + "Z",
            "word_count": len(cleaned_text.split()),
            "character_count": len(cleaned_text),
            "section_count": len(sections),
            "code_block_count": len(code_blocks),
            **meta
        }

        return {
            "title": title,
            "source_type": source_type,
            "raw_text": content,
            "cleaned_text": cleaned_text,
            "sections": sections,
            "code_blocks": code_blocks,
            "metadata": parsed_metadata
        }

    def _clean_text(self, text: str) -> str:
        # Strip excessive newlines and normalize whitespace
        text = re.sub(r'\r\n', '\n', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()

    def _extract_sections(self, text: str) -> List[Dict[str, str]]:
        sections = []
        heading_matches = list(re.finditer(r'^(#{1,4})\s+(.+)$', text, re.MULTILINE))
        
        if not heading_matches:
            return [{"heading": "General", "content": text.strip()}]

        for i, match in enumerate(heading_matches):
            heading = match.group(2).strip()
            start_pos = match.end()
            end_pos = heading_matches[i+1].start() if i + 1 < len(heading_matches) else len(text)
            section_content = text[start_pos:end_pos].strip()
            sections.append({
                "heading": heading,
                "content": section_content
            })
            
        return sections

    def _extract_code_blocks(self, text: str) -> List[Dict[str, str]]:
        code_blocks = []
        pattern = r'```([a-zA-Z0-9_-]*)\n([\s\S]*?)```'
        for match in re.finditer(pattern, text):
            lang = match.group(1).strip() or "text"
            code = match.group(2).strip()
            code_blocks.append({
                "language": lang,
                "code": code
            })
        return code_blocks
