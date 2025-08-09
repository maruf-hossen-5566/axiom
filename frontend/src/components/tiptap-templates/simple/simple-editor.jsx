import * as React from "react"
import {EditorContent, EditorContext, useEditor} from "@tiptap/react"

// --- Tiptap Core Extensions ---
import {StarterKit} from "@tiptap/starter-kit"
import {Image} from "@tiptap/extension-image"
import {TaskItem, TaskList} from "@tiptap/extension-list"
import {TextAlign} from "@tiptap/extension-text-align"
import {Typography} from "@tiptap/extension-typography"
import {Highlight} from "@tiptap/extension-highlight"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"
import {Placeholder, Selection} from "@tiptap/extensions"

// --- UI Primitives ---
import {Button} from "@/components/tiptap-ui-primitive/button"
import {Spacer} from "@/components/tiptap-ui-primitive/spacer"
import {Toolbar, ToolbarGroup, ToolbarSeparator,} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import {ImageUploadNode} from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import {HorizontalRule} from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import {HeadingDropdownMenu} from "@/components/tiptap-ui/heading-dropdown-menu"
import {ImageUploadButton} from "@/components/tiptap-ui/image-upload-button"
import {ListDropdownMenu} from "@/components/tiptap-ui/list-dropdown-menu"
import {BlockquoteButton} from "@/components/tiptap-ui/blockquote-button"
import {CodeBlockButton} from "@/components/tiptap-ui/code-block-button"
import {
    ColorHighlightPopover, ColorHighlightPopoverContent, ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {LinkPopover, LinkContent, LinkButton,} from "@/components/tiptap-ui/link-popover"
import {MarkButton} from "@/components/tiptap-ui/mark-button"
import {TextAlignButton} from "@/components/tiptap-ui/text-align-button"
import {UndoRedoButton} from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import {ArrowLeftIcon} from "@/components/tiptap-icons/arrow-left-icon"
import {HighlighterIcon} from "@/components/tiptap-icons/highlighter-icon"
import {LinkIcon} from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import {useIsMobile} from "@/hooks/use-mobile"
import {useWindowSize} from "@/hooks/use-window-size"
import {useCursorVisibility} from "@/hooks/use-cursor-visibility"
import {useScrolling} from "@/hooks/use-scrolling"

// --- Components ---
import {ThemeToggle} from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import {handleImageUpload, MAX_FILE_SIZE} from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"


import BackToHomeButton from "@/components/custom/Post/New/BackToHomeButton.jsx";
import {TableKit} from "@tiptap/extension-table";
import {
    BetweenHorizontalStart, BetweenVerticalStart, Grid2x2Plus, Grid2x2X, UnfoldHorizontal, X, Youtube as YoutubeIcon
} from "lucide-react";
import Title from "@/components/custom/Post/New/Title.jsx";
import Youtube from '@tiptap/extension-youtube'
import Thumbnail from "@/components/custom/Post/New/Thumbnail.jsx";
import Publish from "@/components/custom/Post/New/Publish.jsx";
import {useEffect} from "react";
import {useEditorStore} from "@/store/editorStore.js";


const MainToolbarContent = ({onHighlighterClick, onLinkClick, isMobile, editor}) => {
    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: Math.max(320, parseInt("480", 10)) || 640,
                height: Math.max(180, parseInt("640", 10)) || 480,
            })
        }
    }

    return (<>
        {!isMobile && <BackToHomeButton/>}
        <Spacer/>
        {/* --------------------------------------- */}
        <ToolbarGroup>
            <UndoRedoButton action="undo"/>
            <UndoRedoButton action="redo"/>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <HeadingDropdownMenu
                levels={[1, 2, 3, 4]}
                portal={isMobile}
            />
            <ListDropdownMenu
                types={["bulletList", "orderedList", "taskList"]}
                portal={isMobile}
            />
            <BlockquoteButton/>
            <CodeBlockButton/>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <MarkButton type="bold"/>
            <MarkButton type="italic"/>
            <MarkButton type="strike"/>
            <MarkButton type="code"/>
            <MarkButton type="underline"/>
            {!isMobile ? (<ColorHighlightPopover/>) : (<ColorHighlightPopoverButton onClick={onHighlighterClick}/>)}
            {!isMobile ? <LinkPopover/> : <LinkButton onClick={onLinkClick}/>}
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <MarkButton type="superscript"/>
            <MarkButton type="subscript"/>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <TextAlignButton align="left"/>
            <TextAlignButton align="center"/>
            <TextAlignButton align="right"/>
            <TextAlignButton align="justify"/>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <Button
                tooltip={"Insert table"}
                onClick={() => editor.chain().focus().insertTable({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <Grid2x2Plus/>
            </Button>
            <Button
                tooltip={"Delete table"}
                onClick={() => editor.chain().focus().deleteTable({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <Grid2x2X/>
            </Button>
            <Button
                tooltip={"Insert row"}
                onClick={() => editor.chain().focus().addRowAfter({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <BetweenHorizontalStart/>
            </Button>
            <Button
                tooltip={"Delete row"}
                onClick={() => editor.chain().focus().deleteRow({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <X/>
            </Button>
            <Button
                tooltip={"Insert column"}
                onClick={() => editor.chain().focus().addColumnAfter({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <BetweenVerticalStart/>
            </Button>
            <Button
                tooltip={"Delete column"}
                onClick={() => editor.chain().focus().deleteColumn({
                    rows: 3, cols: 3, withHeaderRow: true
                }).run()}
                variant={"ghost"}
                className={"size-8 p-0 rounded-[0.75rem] !bg-transparent hover:!bg-accent"}
            >
                <X/>
            </Button>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <Button
                tooltip="Horizontal rule"
                id="add-horizontal-rule"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={"!bg-transparent hover:!bg-accent"}
            >
                <>
                    <UnfoldHorizontal
                        size={"16"}
                        className={"rotate-90"}
                    />
                </>
            </Button>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <ImageUploadButton text="Image"/>
        </ToolbarGroup>
        <ToolbarSeparator/>
        <ToolbarGroup>
            <Button
                tooltip={"Youtube"}
                id="add-youtube"
                onClick={addYoutubeVideo}
                text="Youtube"
                className={"!gap-x-1 !bg-transparent hover:!bg-accent"}
            >
                <>
                    <YoutubeIcon size={'16'}/>
                    Youtube
                </>
            </Button>
        </ToolbarGroup>
        <Spacer/>
        {isMobile && <ToolbarSeparator/>}
        <ToolbarGroup>
            <ThemeToggle/>
        </ToolbarGroup>
    </>);
}

const MobileToolbarContent = ({type, onBack}) => (<>
    <ToolbarGroup>
        <Button
            data-style="ghost"
            onClick={onBack}
        >
            <ArrowLeftIcon className="tiptap-button-icon"/>
            {type === "highlighter" ? (<HighlighterIcon className="tiptap-button-icon"/>) : (
                <LinkIcon className="tiptap-button-icon"/>)}
        </Button>
    </ToolbarGroup>

    <ToolbarSeparator/>

    {type === "highlighter" ? (<ColorHighlightPopoverContent/>) : (<LinkContent/>)}
</>)

export function SimpleEditor() {
    const isMobile = useIsMobile()
    const windowSize = useWindowSize()
    const [mobileView, setMobileView] = React.useState("main")
    const toolbarRef = React.useRef(null)
    const content = useEditorStore(state => state?.content)
    const setContent = useEditorStore(state => state?.setContent)


    const editor = useEditor({
        immediatelyRender: false, shouldRerenderOnTransaction: false, editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor",
            },
        }, content: content || "", onUpdate: ({editor}) => {
            const json = editor.getJSON()
            setContent(json)
        }, extensions: [StarterKit.configure({
            horizontalRule: false, link: {
                openOnClick: false, enableClickSelection: true,
            },
        }), HorizontalRule, TextAlign.configure({types: ["heading", "paragraph"]}), TaskList, TaskItem.configure({nested: true}), Highlight.configure({multicolor: true}), Image, Typography, Superscript, Subscript, Selection, ImageUploadNode.configure({
            accept: "image/*",
            maxSize: MAX_FILE_SIZE,
            limit: 3,
            upload: handleImageUpload,
            onError: (error) => console.error("Upload failed:", error),
        }), Placeholder.configure({
            placeholder: "Type here...."
        }), Youtube.configure({
            controls: false, nocookie: true, width: 0, height: 0,
        }), TableKit.configure({
            table: {resizable: false,}
        })

        ],
    })

    const isScrolling = useScrolling()
    const rect = useCursorVisibility({
        editor, overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
    })

    useEffect(() => {
        if (!isMobile && mobileView !== "main") {
            setMobileView("main")
        }
    }, [isMobile, mobileView])


    useEffect(() => {
        if (!editor || !content) return;

        const isDifferent = JSON.stringify(content) !== JSON.stringify(editor.getJSON());
        if (isDifferent) {
            editor.commands.setContent(content, false);
        }
    }, [content, editor]);


    return (<div className="simple-editor-wrapper">
        <EditorContext.Provider value={{editor}}>
            <Toolbar
                ref={toolbarRef}
                style={{
                    ...(isScrolling && isMobile ? {
                        opacity: 0, transition: "opacity 0.1s ease-in-out"
                    } : {}), ...(isMobile ? {
                        bottom: `calc(100% - ${windowSize.height - rect.y}px)`,
                    } : {}),
                }}
            >
                {mobileView === "main" ? (<MainToolbarContent
                    onHighlighterClick={() => setMobileView("highlighter")}
                    onLinkClick={() => setMobileView("link")}
                    isMobile={isMobile}
                    editor={editor}
                />) : (<MobileToolbarContent
                    type={mobileView === "highlighter" ? "highlighter" : "link"}
                    onBack={() => setMobileView("main")}
                />)}
            </Toolbar>

            {/* --- Title and Thumbnail */}
            <Thumbnail/>
            <Title/>

            <EditorContent
                editor={editor}
                role="presentation"
                className="simple-editor-content !prose dark:!prose-invert min-h-screen !max-w-screen-md w-full"
            />
            {/*--- Publish */}
            <Publish/>
        </EditorContext.Provider>
    </div>);
}
